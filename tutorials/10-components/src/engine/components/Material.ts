import Texture2D from 'engine/textures/Texture2D';
import Color from 'engine/utils/Color';
import Component from 'engine/components/Component';

export default class Material extends Component {
    
    _isMaterial : boolean = true;

    texture2D : Texture2D = null;

    diffuse: { color: Color, intensity: number } = {
        color: new Color(0xFFFFFF),
        intensity: 1.0
    };

    specular: { color: Color, intensity: number, exponent: number } = {
        color: new Color(0xFFFFFF),
        intensity: 1.0,
        exponent: 50.0
    };

    ambient: { intensity: number } = {
        intensity: 1.0
    };

    constructor() {
        super('material');
    }

}