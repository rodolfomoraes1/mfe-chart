import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { BarChart } from './app/bar-chart/bar-chart';

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const element = createCustomElement(BarChart, {
    injector: app.injector,
  });

  if (!customElements.get('mfe-bar-chart')) {
    customElements.define('mfe-bar-chart', element);
  }
})();