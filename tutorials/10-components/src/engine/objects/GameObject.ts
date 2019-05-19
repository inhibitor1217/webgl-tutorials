import Component from "engine/components/Component";
import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/Material';
import Transform from "engine/components/Transform";
import ShaderMaster from "engine/shaders/ShaderMaster";

export default class GameObject {

    _components: Array<Component> = [];

    _shader: string = 'DefaultShader';

    constructor() {
        
    }

    start(): void {
        this._components.forEach(component => component.start());
    }

    update(deltaTime: number): void {
        this._components.forEach(component => component.update(deltaTime));
    }

    render(): void {
        const program = ShaderMaster.get(this._shader);
        const mesh = this.getComponent('Mesh') as Mesh;
        const material = this.getComponent('Material') as Material;
        const transform = this.getComponent('Transform') as Transform;

        if (mesh && material && transform) {
            program.start();
            mesh.start();
            material.start();

            program.setUniformMatrix4fv('transformation', transform.getLocalTransform());
            mesh.render();

            program.stop();
            mesh.stop();
            material.stop();
        }
    }

    stop(): void {
        this._components.forEach(component => component.stop());
    }

    addComponent(component: Component): void {
        if (component.getGameObject())
            component.getGameObject().removeComponent(component);
        this._components.push(component);
        component._gameObject = this;
    }

    removeComponent(component: Component): void {
        if (component.getGameObject() != this)
            return;
        const idx = this._components.indexOf(component);
        if (idx >= 0) {
            this._components.splice(idx, 1);
            component._gameObject = null;
        }
    }

    hasComponent(componentName: string): boolean {
        return this.getComponent(componentName) != null;
    }

    getComponent(componentName: string): Component {
        return this._components.find(component => component.constructor.name == componentName);

    }

    getComponents(componentName: string): Array<Component> {
        return this._components.filter(component => component.constructor.name == componentName);
    }

    setShader(shaderName: string): void { this._shader = shaderName; }
    getShader(): string { return this._shader; }

}