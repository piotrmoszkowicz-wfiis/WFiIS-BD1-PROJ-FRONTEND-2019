export const mapIdToName = mapId => {
  switch(parseInt(mapId, 10)) {
    case 1:
      return "Karkand";
    case 2:
      return "Oman";
    case 3:
      return "Sharqi";
    default:
      return "Nieznana";
  }
};

export const gameModeIdToName = gameModeId => {
  if (parseInt(gameModeId, 10) === 1) {
    return "Assault";
  } else {
    return "Rush";
  }
};

export const kitIdToName = kitId => {
  switch(parseInt(kitId, 10)) {
    case 0:
      return "Snajper";
    case 1:
      return "Szturmowiec";
    case 2:
      return "Medyk";
    case 3:
      return "Inżynier";
    case -1:
      return "Wszystkie";
  }
}
