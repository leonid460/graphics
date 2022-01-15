import { model as model1 } from './testModel';
import { model as model2 } from './testModel2';
import { model as model3 } from './testModel3';
import { model as model4 } from './testModel4';
import { model as model5 } from './testModel5';

export function loadModel(modelNum: number) {
  const models = [model1, model2, model3, model4, model5];

  return models[modelNum-1];
}
