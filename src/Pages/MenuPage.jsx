// src/components/MenuPage.js
import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography, Table, Spin, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';
import Sidebar from './Sidebar';

const API_URL = process.env.REACT_APP_API_URL;
const { Content } = Layout;
const { Title } = Typography;

const MenuPage = ({ onMenuClick }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    useEffect(() => {
        axios.get(`${API_URL}groups`)
            .then(res => {
                setGroups(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching groups:', err);
                setLoading(false);
            });
    }, []);

    const showEditModal = (item) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalVisible(true);
    };
    const showAddModal = () => {
        addForm.resetFields();
        setIsAddModalVisible(true);
    };
    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };
   const handleAddOk = () => {
  addForm.validateFields()
    .then(values => {
      console.log('Values to be added:', values);
      const { groupId, ...itemData } = values;  // extract groupId and remove from itemData payload

      axios.post(`${API_URL}groups/${groupId}`, itemData)
        .then(res => {
          const newItem = res.data;

          // Add new item to the corresponding group in state
          const updatedGroups = groups.map(group =>
            group.groupId === groupId
              ? { ...group, items: [...group.items, newItem] }
              : group
          );

          setGroups(updatedGroups);
          setIsAddModalVisible(false);
          message.success('Item added successfully');
        })
        .catch(err => {
          console.error('Failed to add item:', err);
          message.error('Failed to add item');
        });
    });
};
    const handleEditOk = () => {
        form.validateFields().then(values => {
            const itemId = editingItem.itemId;

            axios.put(`${API_URL}items/${itemId}`, values)
                .then(res => {
                    const updatedItem = res.data;

                    // Update groups state with updated item from API
                    const updatedGroups = groups.map(group => ({
                        ...group,
                        items: group.items.map(i =>
                            i.itemId === updatedItem.itemId ? { ...i, ...updatedItem } : i
                        )
                    }));

                    setGroups(updatedGroups);
                    setIsModalVisible(false);
                    setEditingItem(null);
                    message.success('Item updated successfully');
                })
                .catch(err => {
                    console.error('Update failed:', err);
                    message.error('Failed to update item');
                });
        });
    };

    const handleEditCancel = () => {
        setIsModalVisible(false);
        setEditingItem(null);
    };

    const itemColumns = [
        {
            title: 'Item ID',
            dataIndex: 'itemId',
            key: 'itemId',
        },
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Description',
            dataIndex: 'itemDescription',
            key: 'itemDescription',
        },
        {
            title: 'Price',
            dataIndex: 'itemPrice',
            key: 'itemPrice',
            render: (price) => `₹${price}`
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, item) => (
                <Button type="primary" onClick={() => showEditModal(item)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar selectedKey="menu" onMenuClick={onMenuClick} />
            <Layout>
                <Content style={{ margin: '20px' }}>
                    <Title level={2}>Menu</Title>
                    {loading ? (
                        <Spin tip="Loading menu..." />
                    ) : (
                        groups.map(group => (
                            <Card
                                key={group.groupId}
                                title={group.groupName}
                                style={{ marginBottom: '20px' }}
                                bordered
                            >
                                <Table
                                    columns={itemColumns}
                                    dataSource={group.items.map(item => ({ ...item, key: item.itemId }))}
                                    pagination={false}
                                    bordered
                                />
                            </Card>

                        ))
                    )}
                    <Modal
                        title="Add New Item"
                        visible={isAddModalVisible}
                        onOk={handleAddOk}
                        onCancel={handleAddCancel}
                        okText="Add"
                    >
                        <Form form={addForm} layout="vertical">
                            <Form.Item
                                label="Name"
                                name="itemName"
                                rules={[{ required: true, message: 'Please enter item name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="itemDescription"
                                rules={[{ required: true, message: 'Please enter description' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="itemPrice"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Group ID"
                                name="groupId"
                                rules={[{ required: true, message: 'Please enter group id' }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title="Edit Item"
                        visible={isModalVisible}
                        onOk={handleEditOk}
                        onCancel={handleEditCancel}
                        okText="Save"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                label="Name"
                                name="itemName"
                                rules={[{ required: true, message: 'Please enter item name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="itemDescription"
                                rules={[{ required: true, message: 'Please enter description' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="itemPrice"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
            <Button
                type="primary"

                size="large"
                style={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    zIndex: 1000,
                    width: 100, // Make it wider for text
                    height: 60, // Adjust height as needed

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    animation: 'pulse 1.5s infinite', // Add animation
                }}
                onClick={showAddModal}
            >
                + Add
            </Button>
        </Layout>
    );
};

export default MenuPage;
