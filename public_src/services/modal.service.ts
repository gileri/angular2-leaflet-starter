import {Injectable, Injector, provide, IterableDiffers, KeyValueDiffers, Renderer} from 'angular2/core';
import {ModalConfig, Modal, ICustomModal, OKOnlyContent, OKOnlyModal} from '../../node_modules/angular2-modal/dist/angular2-modal';

@Injectable()
export class ModalService {
    aboutConfig: ModalConfig;
    aboutContent: OKOnlyContent;

    constructor(private modal: Modal, private injector: Injector, private renderer: Renderer) {
        this.aboutConfig = new ModalConfig('lg', false, 27);
        this.aboutContent = new OKOnlyContent();
    }

    showAbout() {
        let bindings = Injector.resolve([
            provide(ICustomModal, { useValue: this.aboutContent }),
            provide(IterableDiffers, {useValue: this.injector.get(IterableDiffers)}),
            provide(KeyValueDiffers, {useValue: this.injector.get(KeyValueDiffers)}),
            provide(Renderer, {useValue: this.renderer})
        ]);

        this.modal.open(<any>OKOnlyModal, bindings, this.aboutConfig);
    }
};
