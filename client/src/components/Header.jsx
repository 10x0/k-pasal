import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useSession } from './Session/Provider';

function Header() {
  const [keyword, setKeyword] = useState('');
  const { verifySession } = useSession();
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  const searchChange = (event) => {
    setKeyword(event.target.value);
  };

  return verifySession() ? (
    <PrivateHeader search={search} searchChange={searchChange} />
  ) : (
    <PublicHeader search={search} searchChange={searchChange} />
  );
}

function PrivateHeader({ search, searchChange }) {
  const { saveSession, session } = useSession();

  const logOut = useCallback(() => {
    saveSession(undefined);
  }, [saveSession]);

  return (
    <header className="flex-none px-8 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="select-none text-4xl flex-grow md:flex-grow-0">
          <span className="text-blue-600 devnagari">कपडा</span>
          <span className="text-black orbitron">Pasal</span>
        </Link>
        {session?.user?.role !== 'admin' && (
          <div className="flex items-center rounded-lg bg-white p-2 shadow-2xl">
            <SearchOutlined />
            <form onSubmit={search}>
              <input
                className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 w-96 group"
                type="text"
                placeholder="I am searching for..."
                onChange={searchChange}
              />
            </form>
          </div>
        )}
        <div className="flex items-center">
          <div>
            <i className="fa-solid fa-user mx-2"></i>
            {session.user.name}
          </div>
          {session?.user?.role !== 'admin' && (
            <Link className="px-4" to="/cart">
              <i className="fa-solid fa-bag-shopping"></i>
            </Link>
          )}
          <Button type="link" onClick={logOut}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

function PublicHeader({ search, searchChange }) {
  const { openModal } = useSession();

  return (
    <header className="flex-none px-8 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="select-none text-4xl flex-grow md:flex-grow-0">
          <span className="text-blue-600 devnagari">कपडा</span>
          <span className="text-black orbitron">Pasal</span>
        </Link>
        <div className="flex items-center rounded-lg bg-white p-2 shadow-2xl">
          <SearchOutlined />
          <form onSubmit={search}>
            <input
              className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 w-96 group"
              type="text"
              placeholder="I am searching for..."
              onChange={searchChange}
            />
          </form>
        </div>
        <aside>
          <Link className="px-4" to="/cart">
            <i className="fa-solid fa-bag-shopping"></i>
          </Link>
          <Button type="link" onClick={() => openModal(true)}>
            Login / Register
          </Button>
        </aside>
      </div>
    </header>
  );
}

export default Header;
