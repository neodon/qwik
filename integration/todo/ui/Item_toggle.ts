/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */

import type { EntityKey, Provider } from '@builder.io/qwik';
import type { ItemEntity } from '../data/Item';
import {
  injectEventHandler,
  provideComponentProp,
  provideQrlExp,
  provideEntity,
} from '@builder.io/qwik';

export default injectEventHandler(
  // Providers
  null,
  provideQrlExp<boolean>('toggleState'),
  provideEntity<ItemEntity>(
    provideComponentProp('$item') as any as Provider<EntityKey<ItemEntity>>
  ), // TODO(type):
  // Handler
  async function (this: null, toggleState: boolean, itemEntity: ItemEntity) {
    await itemEntity.toggle(toggleState);
  }
);
