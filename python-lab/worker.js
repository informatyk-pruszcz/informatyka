// Python działa w osobnym wątku. Zatrzymanie programu nie blokuje strony.
(async () => { try {
self.postMessage({type:'status',message:'Łączenie z biblioteką Python…'});
const { loadPyodide } = await import('https://unpkg.com/pyodide@314.0.7/pyodide.mjs');
self.postMessage({type:'status',message:'Pobieranie środowiska Python…'});
const py = await loadPyodide({indexURL:'https://unpkg.com/pyodide@314.0.7/'});
await py.runPythonAsync(String.raw`
import ast, builtins, contextlib, io, json, traceback

def lab_run(payload):
    request = json.loads(payload)
    code = request['code']
    results = []
    for case in request['cases']:
        output = io.StringIO()
        transcript = io.StringIO()
        answers = iter(case.get('input', []))
        namespace = {'__name__': '__main__'}
        error = None
        class LimitedOutput:
            def write(self, value):
                if output.tell() + len(value) > 20000:
                    raise RuntimeError('LIMIT_OUTPUT')
                output.write(value)
                transcript.write(value)
                return len(value)
            def flush(self):
                pass
        def read_answer(prompt=''):
            try:
                answer = next(answers)
            except StopIteration:
                raise EOFError('Brak kolejnej odpowiedzi w polu danych do input().') from None
            transcript.write(str(prompt) + str(answer) + '\n')
            return answer
        # Oddzielny słownik nazw przy każdym uruchomieniu i każdym teście.
        namespace['__builtins__'] = dict(vars(builtins), input=read_answer)
        features = []
        try:
            tree = ast.parse(code, filename='uczen.py')
            features = [type(node).__name__ for node in ast.walk(tree)]
            features += ['call:' + node.func.id for node in ast.walk(tree)
                         if isinstance(node, ast.Call) and isinstance(node.func, ast.Name)]
            with contextlib.redirect_stdout(LimitedOutput()), contextlib.redirect_stderr(LimitedOutput()):
                exec(compile(tree, 'uczen.py', 'exec'), namespace)
        except BaseException as exc:
            line = getattr(exc, 'lineno', None)
            for frame in traceback.extract_tb(exc.__traceback__):
                if frame.filename == 'uczen.py':
                    line = frame.lineno
            error = {'type': type(exc).__name__, 'message': str(exc)[:600],
                     'line': line, 'column': getattr(exc, 'offset', None)}
        variables = {}
        for name, value in list(namespace.items()):
            if name.startswith('_') or len(variables) >= 12:
                continue
            if type(value) in (str, int, float, bool, list, tuple):
                variables[name] = repr(value)[:160]
        results.append({'output': output.getvalue(), 'transcript': transcript.getvalue()[:24000],
                        'error': error, 'features': features, 'variables': variables})
    return json.dumps(results, ensure_ascii=False)
`);
self.postMessage({type:'ready'});
self.onmessage = async ({data}) => {
  if (data.type !== 'run') return;
  try {
    py.globals.set('lab_request', JSON.stringify(data.payload));
    const result = await py.runPythonAsync('lab_run(lab_request)');
    self.postMessage({type:'result',id:data.id,results:JSON.parse(result)});
  } catch (error) {
    self.postMessage({type:'failure',id:data.id,message:String(error).slice(0,500)});
  }
};
} catch (error) { self.postMessage({type:'failure',message:String(error)}); } })();
