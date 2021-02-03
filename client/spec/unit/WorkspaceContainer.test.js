require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const WorkspaceContainer = require('../../src/components/WorkspaceContainer.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = enzyme;
const { data, noData, locations } = require('./data');

describe('WorkspaceContainer', () => {

  it('should render an empty div when locations prop is null', () => {
    const wrapper = mount(<WorkspaceContainer locations={null} />);
    expect(wrapper.find('div').children().length).toEqual(0);
  });

  it('should render a div for each location passed in', () => {
    const wrapper = mount(<WorkspaceContainer locations={locations} />);
    expect(wrapper.children().length).toEqual(3);
    expect(wrapper.find('.nb-container').length).toEqual(2);
  })

})