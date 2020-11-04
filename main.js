const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.save();

// Default export ONLY ONE!
export default ctx;
export { canvas };
