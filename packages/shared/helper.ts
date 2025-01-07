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

export const mergeSurveyData = (
  surveyParts: { [key: string]: string | string[] }[],
): { [key: string]: string } =>
  surveyParts.reduce<{ [key: string]: string }>(
    (survey, currentPart) => {
      const updatedSurvey = survey;

      Object.keys(currentPart).forEach((key) => {
        const currentValue =
          (Array.isArray(currentPart[key])
            ? currentPart[key].join("; ")
            : currentPart[key]) ?? "";
        if (updatedSurvey[key] === undefined) updatedSurvey[key] = currentValue;
        else if (updatedSurvey[key].length === 0 && currentValue.length > 0)
          updatedSurvey[key] = currentValue;
      });

      return updatedSurvey;
    },
    {} as { [key: string]: string },
  );
