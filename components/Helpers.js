export const getTypeName = (types) => {  const getSecondType = types[1]
  if (getSecondType && getSecondType.type.name === 'flying') {
    return getSecondType.type.name;
  }
  return types[0].type.name;
}

export const getID = (typeUrl) => {
  let id = [];
  typeUrl.map((type) => {
    let idUrl = type.type.url.split('/');
    id.push(idUrl[6]);
  })
  return id;
}
