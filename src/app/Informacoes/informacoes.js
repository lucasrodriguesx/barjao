'use client'
import React from 'react';
import './informacoes.css';

const Informacoes = () => {
    return (
        <div className="wrapper">
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contatos</a>
                    </li>
                </ul>
            </nav>

            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="#" className="brand-link">
                    <span className="brand-text font-weight-light">Meu Dashboard</span>
                </a>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            {/* Adicione mais itens de menu aqui, se necessário */}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <h1 className="m-0">Dashboard de Informações</h1>
                    </div>
                </div>

                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>Vendas</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Exemplo de dados; você pode substituir por dados reais */}
                                                <tr>
                                                    <td>1</td>
                                                    <td>Bebida A</td>
                                                    <td>50</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Bebida B</td>
                                                    <td>30</td>
                                                </tr>
                                                {/* Adicione mais dados conforme necessário */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Informacoes;
