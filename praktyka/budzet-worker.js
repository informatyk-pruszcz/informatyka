self.onmessage = async event => {
  try {
    importScripts('./vendor/xlsx-0.20.3.min.js');
    const {inspectBudget} = await import('./budzet.js');
    const book = XLSX.read(event.data, {type:'array', cellFormula:true, sheetRows:16, cellHTML:false, cellText:false, bookVBA:false});
    self.postMessage(inspectBudget(book).message);
  } catch {
    self.postMessage('Nie udało się odczytać budżetu. Otwórz plik startowy, zapisz swoją kopię jako XLSX i wybierz ją ponownie.');
  }
};
