import Component from "engine/components/Component";
import Mesh from 'engine/components/Mesh';
import Material from 'engine/components/Material';

export default class GameObject {

    _components: Array<Component> = [];

    _shader: string = 'DefaultShader';

    constructor() {
        
    }

    start(): void {
        this._components.forEach(component => component.start());
    }

    update(): void {

    }

    render(): void {
        const mesh = this.getComponent('Mesh') as Mesh;
        const material = this.getComponent('Material') as Material;

        if (mesh && material) {
            mesh.start();
            material.start();
            mesh.render();
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
    }

    removeComponent(component: Component): void {
        if (component.getGameObject() != this)
            return;
        const idx = this._components.indexOf(component);
        if (idx >= 0)
            this._components.splice(idx, 1);
    }

    hasComponent(componentName: string): boolean {
        return this.getComponent(componentName) != null;
    }

    getComponent(componentName: string): Component {
        return this._components.find(component => typeof component == componentName);

    }

    getComponents(componentName: string): Array<Component> {
        return this._components.filter(component => typeof component == componentName);
    }

    setShader(shaderName: string): void { this._shader = shaderName; }
    getShader(): string { return this._shader; }

}