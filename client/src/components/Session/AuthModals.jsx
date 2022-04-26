import { Layout, Modal } from 'antd';
import Login from '../../pages/customer/login';
import Register from '../../pages/customer/register';

export function AuthModals({
  openModal,
  modalVisible,
  signInVisible,
  signUpVisible,
}) {
  return (
    <>
      <Modal
        visible={modalVisible}
        onCancel={() => openModal(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        centered
        bodyStyle={{ padding: '80px' }}
      >
        <Layout>
          {signInVisible && <Login />}
          {signUpVisible && <Register />}
        </Layout>
      </Modal>
    </>
  );
}
