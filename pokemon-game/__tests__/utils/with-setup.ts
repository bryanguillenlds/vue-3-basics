import { createApp } from 'vue';

//Simulate environment where composable will run
export const withSetup = (composable: () => void) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;

  //Create a fake app to test the composable in a setup context
  const app = createApp({
    setup() {
      result = composable();

      return () => {}; //we have to return something
    }
  });

  app.mount(document.createElement('div')); //mount the app to a fake element

  return [result, app] as const;
};
