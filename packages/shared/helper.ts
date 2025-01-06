export const mergeRows = (rows: (undefined | string)[][]): string[] => {
  const mergedRow: string[] = [];

  rows.forEach((row) => {
    row.forEach((column, i) => {
      const parsedColumn = column ?? "";

      if (mergedRow[i] === undefined) {
        mergedRow.push(parsedColumn);
        return;
      }

      if (mergedRow[i] === parsedColumn) return;

      if (mergedRow[i].length === 0 && parsedColumn.length > 0)
        mergedRow[i] = parsedColumn;
    });
  });

  return mergedRow;
};
