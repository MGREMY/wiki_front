import { UserService } from '@app-core/api/user/user.service';
import { paginationContainer } from '@app-shared/pagination-container';

import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserListStoreService {
  private readonly _userService = inject(UserService);

  public usersResource = paginationContainer({
    stream: ({ params }) => this._userService.get(params),
  });
}
