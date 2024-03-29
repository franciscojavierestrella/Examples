import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MindundisloyaltyTestModule } from '../../../test.module';
import { RfbEventDeleteDialogComponent } from 'app/entities/rfb-event/rfb-event-delete-dialog.component';
import { RfbEventService } from 'app/entities/rfb-event/rfb-event.service';

describe('Component Tests', () => {
  describe('RfbEvent Management Delete Component', () => {
    let comp: RfbEventDeleteDialogComponent;
    let fixture: ComponentFixture<RfbEventDeleteDialogComponent>;
    let service: RfbEventService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MindundisloyaltyTestModule],
        declarations: [RfbEventDeleteDialogComponent]
      })
        .overrideTemplate(RfbEventDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbEventDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbEventService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
