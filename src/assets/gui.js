import dat from 'dat.gui'
const controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03
}
const gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);

export default controls