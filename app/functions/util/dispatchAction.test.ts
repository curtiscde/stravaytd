import * as octokitCore from '@octokit/core';
import { IAthleteYtd } from '../types/IAthleteYtd';
import { dispatchAction } from './dispatchAction';

jest.mock('@octokit/core');

const athleteYtd: IAthleteYtd = {
  athleteId: 1,
  count: 2,
  distance: 3,
  movingTime: 4,
  elevationGain: 5,
};

describe('dispatchAction', () => {
  const mockRequest: any = jest.fn();

  beforeAll(async () => {
    process.env.GITHUB_REPO = 'github_repo_name';
    process.env.GITHUB_REF = 'github_ref';
    jest.spyOn(octokitCore as any, 'Octokit').mockImplementationOnce(() => ({ request: mockRequest }));
    await dispatchAction(athleteYtd);
  });

  it('calls octokit.request', () => {
    expect(mockRequest).toHaveBeenCalledWith(
      'POST /repos/github_repo_name/actions/workflows/update-current-ytd.yml/dispatches',
      {
        ref: 'github_ref',
        inputs: {
          athleteid: '1',
          count: '2',
          distance: '3',
          elevationgain: '5',
          movingtime: '4',
        },
      },
    );
  });
});
