import './axeCheck';
import './syncFixtures';
import './upload';
import './injectAxeThenAxeCheck';
import './hasCount';
import 'cy-mobile-commands';
import 'cypress-wait-until';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  caputre: 'viewport',
});
