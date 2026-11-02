const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
let alerts = 0;
const nodes = {};
for (const id of ['aqi-city-input', 'aqi-value-input', 'add-btn', 'aqi-table']) {
  nodes[id] = { value: '', addEventListener: () => {} };
}
const context = { document: { getElementById: id => nodes[id] }, alert: () => alerts++ };
vm.createContext(context);
vm.runInContext(fs.readFileSync(require.resolve('../16/task.js'), 'utf8'), context);
function add(city, value) {
  nodes['aqi-city-input'].value = city;
  nodes['aqi-value-input'].value = value;
  context.addAqiData();
}
add('  北京  ', ' 100 ');
assert.strictEqual(context.aqiData['北京'], '100');
add('Shanghai', '0');
assert.strictEqual(context.aqiData.Shanghai, '0');
for (const [city, value] of [['A_B', '50'], ['Paris', ''], ['Paris', '-1'], ['Paris', '1.5'], ['Paris', '1 0'], ['A(B)', '2'], ['', '20']]) add(city, value);
assert.strictEqual(alerts, 7);
assert.strictEqual(Object.keys(context.aqiData).length, 2);
console.log('AQI input regression tests passed');
