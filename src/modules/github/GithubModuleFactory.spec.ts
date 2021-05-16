import { GithubModuleFactory } from './GithubModuleFactory';

describe('GithubModuleFactory', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.GITHUB_TOKEN;
  });

  it('should create collector', () => {
    process.env.GITHUB_TOKEN = 'SOME_TOKEN';
    const collectorInstance = GithubModuleFactory.collectorInstance();
    expect(collectorInstance).not.toBeNull();
  });

  it('should fail to create collector', () => {
    expect(() =>
      GithubModuleFactory.collectorInstance()
    ).toThrowErrorMatchingSnapshot();
  });

  it('should create collectorConfiguration', () => {
    const collectorConfiguration = GithubModuleFactory.collectorConfiguration(
      {}
    );
    expect(collectorConfiguration).not.toBeNull();
  });
});
