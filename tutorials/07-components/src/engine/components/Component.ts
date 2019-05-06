import GameObject from "engine/objects/GameObject";

export default abstract class Component {

    _gameObject: GameObject = null;

    constructor() { }

    getGameObject(): GameObject { return this._gameObject; }

    abstract start(): void
    abstract update(deltaTime: number): void
    abstract stop(): void

}