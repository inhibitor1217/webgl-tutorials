import Component from 'engine/components/Component';

export default class GameObject {

    _active     : boolean = false;
    _deleted    : boolean = false;
    _components : Array<Component> = [];

    constructor() { }

    start(): void {
        this._components.forEach(component => {
            if (!component._deleted && component._active)
                component.start();
        });
    }

    update(deltaTime: number): void {
        this._components.forEach(component => {
            if (!component._deleted && component._active)
                component.update(deltaTime);
        });
    }

    stop(): void {
        this._components.forEach(component => {
            if (!component._deleted && component._active)
                component.stop();
        });
    }

    addComponent(component: Component): void {
        if (component.getGameObject())
            component.getGameObject().removeComponent(component);
        this._components.push(component);
        component._gameObject = this;
    }

    removeComponent(component: Component): void {
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
        return this._components.find(component => component._componentName == componentName);

    }

    getComponents(componentName: string): Array<Component> {
        return this._components.filter(component => component._componentName == componentName);
    }

}