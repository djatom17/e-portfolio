import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}
function onBlur() {
    console.log('blur');
}
function onFocus() {
    console.log('focus');
}
function onSearch(val) {
    console.log('search:', val);
}

const options = [
    {
        value: 'firstname',
        label: 'Firstname',
    },
    {
        value: 'lastname',
        label: 'Lastname',
    },
    {
        value: 'gender',
        label: 'Gender',
    },
    {
        value: 'biotext',
        label: 'BioText',
    },
    {
        value: 'skills',
        label: 'Skills',
    },
    {
        value: 'insperationquote',
        label: 'Quote',
    },
];

ReactDOM.render(
    <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    >
        <Option value="option">Choose Gender</Option>
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
    </Select>,
    mountNode,
);

const App = () => (
    <div className="site-input-group-wrapper">
        <Input.Group compact>
            <Select defaultValue="Gender">
                <Option value="Gender">Male</Option>
                <Option value="Gender">Female</Option>
            </Select>
            <Input style={{ width: '50%' }} defaultValue="if either write your gender here" />
        </Input.Group>
        <br />
        <Input.Group compact>
            <Input style={{ width: '20%' }} defaultValue="63" />
            <Input.Search style={{ width: '30%' }} defaultValue="contact number" />
        </Input.Group>
        <br />
        <Input.Group compact>
            <Select defaultValue="Occupation status">
                <Option value="Option1">Employed</Option>
                <Option value="Option2">UnEmployed</Option>
            </Select>
        </Input.Group>
        <br />
        <Input.Group compact>
            <Input style={{ width: '50%' }} defaultValue="Bio txt" />
            <DatePicker style={{ width: '50%' }} />
        </Input.Group>
        <br />
        <Input.Group compact>
            <Input style={{ width: '30%' }} defaultValue="Life insiperation quote" />
            <DatePicker.RangePicker style={{ width: '70%' }} />
        </Input.Group>
        <br />
    </div>
);

ReactDOM.render(<App />, mountNode);