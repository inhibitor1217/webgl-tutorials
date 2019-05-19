import Component from 'engine/components/Component';
import Transform from 'engine/components/Transform';

import { vec3 } from 'gl-matrix';

export default class QuadMovement extends Component {

    RADIUS = 0.3;
    ANGULAR_VELOCITY = 2 * Math.PI / 5000;

    angle = 0;

    start(): void {}

    update(deltaTime: number): void {
        const transform = this.getGameObject().getComponent('Transform') as Transform;
        
        this.angle += this.ANGULAR_VELOCITY * deltaTime;
        transform.setPosition(vec3.fromValues(
            this.RADIUS * Math.cos(this.angle), this.RADIUS * Math.sin(this.angle), 0
        ));
    }

    stop(): void {}

}