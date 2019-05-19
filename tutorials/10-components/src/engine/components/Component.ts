import GameObject from 'engine/objects/GameObject';

export default class Component {

    _isComponent        : boolean    = true;
    _componentName      : string     = '';
    _requiredComponents : Array<string> = [];

    _loaded     : boolean = false;
    _active     : boolean = false;
    _deleted    : boolean = false; 
    _gameObject : GameObject = null;

    constructor(componentName: string) {
        this._componentName = componentName;
    }

    init(): void { }
    start(): void { }
    update(deltaTime: number): void { }
    stop(): void { }
    delete(): void { this._deleted = true; }

    onEnable(): void { }
    onDisable(): void { }

    enable(): void  { this.onEnable();  this._active = true;  }
    disable(): void { this.onDisable(); this._active = false; }

    getGameObject(): GameObject { return this._gameObject; }

}