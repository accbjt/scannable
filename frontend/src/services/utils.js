export const getIndicationColor = (qty) => {
  if (qty > 200) {
    return '#9cd08a';
  } else if (qty > 100 && qty < 200) {
    return '#ffc093';
  }

  return '#ffb8b7';
};
