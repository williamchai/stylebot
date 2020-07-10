import {
  GetAllOptionsRequest,
  GetOptionRequest,
  SetOptionRequest,
  OpenOptionsPageRequest,
} from '../../types/BackgroundPageRequest';

import {
  GetAllOptionsResponse,
  GetOptionResponse,
} from '../../types/BackgroundPageResponse';

import { saveOption } from '../options';
import { StylebotOptions } from '../../types';

type Request =
  | GetAllOptionsRequest
  | GetOptionRequest
  | SetOptionRequest
  | OpenOptionsPageRequest;

type Response = GetAllOptionsResponse | GetOptionResponse;

export default (
  request: Request,
  options: StylebotOptions,
  sendResponse: (response: Response) => void
) => {
  if (request.name === 'getAllOptions') {
    sendResponse(options);
  } else if (request.name === 'getOption') {
    sendResponse(options[request.optionName as keyof StylebotOptions]);
  } else if (request.name === 'setOption') {
    saveOption(request.option.name, request.option.value);
  } else if (request.name === 'openOptionsPage') {
    chrome.runtime.openOptionsPage();
  }
};
