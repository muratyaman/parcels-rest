import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Parcel } from '../entity/Parcel';

@EventSubscriber()
export class ParcelSubscriber implements EntitySubscriberInterface<Parcel> {
  listenTo() {
    return Parcel;
  }
  afterInsert(event: InsertEvent<any>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }
  afterUpdate(event: UpdateEvent<any>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }
  afterRemove(event: RemoveEvent<any>) {
    console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  }
}
