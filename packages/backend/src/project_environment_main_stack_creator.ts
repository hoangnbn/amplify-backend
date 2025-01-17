import {
  MainStackCreator,
  UniqueBackendIdentifier,
} from '@aws-amplify/plugin-types';
import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { AmplifyStack } from './engine/amplify_stack.js';
import { getMainStackName } from './get_main_stack_name.js';

/**
 * Creates stacks that are tied to a given project environment via an SSM parameter
 */
export class ProjectEnvironmentMainStackCreator implements MainStackCreator {
  private mainStack: Stack | undefined = undefined;
  /**
   * Initialize with a project environment
   */
  constructor(
    private readonly scope: Construct,
    private readonly uniqueDeploymentIdentifier: UniqueBackendIdentifier
  ) {}

  /**
   * Get a stack for this environment in the provided CDK scope
   */
  getOrCreateMainStack = (): Stack => {
    if (this.mainStack === undefined) {
      this.mainStack = new AmplifyStack(
        this.scope,
        getMainStackName(this.uniqueDeploymentIdentifier)
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.mainStack!;
  };
}
