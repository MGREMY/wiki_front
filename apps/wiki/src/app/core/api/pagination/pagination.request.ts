export interface SortRequest {
  propertyName: string;
  isDescending: boolean;
}

export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  sortRequests?: SortRequest[] | undefined;
}

export function toURLSearchParams(request: PaginationRequest) {
  const urlSearchParams = new URLSearchParams({
    pageNumber: request.pageNumber.toString(),
    pageSize: request.pageSize.toString(),
  });

  if (request.sortRequests !== undefined && request.sortRequests.length > 0) {
    urlSearchParams.append('sortRequests', JSON.stringify(request.sortRequests));
  }

  return urlSearchParams;
}
