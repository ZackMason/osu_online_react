import Reacwt, { useState, useEffect, useRef } from 'react';
import './App.css';
import Table from './Table'
import TableInsertBox from './TableInsertBox'

function App() {
  const title = 'OSUOnline';
  const [table_name, set_table_name] = useState('player');
  const table_ref = useRef(null);
  const table_insert_ref = useRef(null);

  let refreshTable = () => {
    const fetch_data = async () => {
      let data = await fetch('/' + table_name).then(res => res.json()).then(data => {
        return (data);
      });
      table_ref.current.setTable(data.table);
      table_ref.current.setAttributes(data.attributes)
      table_ref.current.setEditAttributes(data.editable)
      table_insert_ref.current.setAttributes(data.editable)
    };
    fetch_data()
  }

  let forceRerender = () => {
    let n = table_name;
    set_table_name(n);
  }

  useEffect(refreshTable, [table_name]);
  
  function handle_link_click(name) {
    console.log(name)
    set_table_name(name);
    table_insert_ref.current.resetState()
    table_insert_ref.current.setTableName(name);
  }

  return (
   <>
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">OSU Online</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"></input>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
    </li>
  </ul>
</header>

<div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Homepage
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => handle_link_click('quest')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                Quests
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => handle_link_click('item')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Items
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => handle_link_click('player')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Players
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => handle_link_click('npc')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                NPCs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => handle_link_click('map')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                Maps
              </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => handle_link_click('player_inventory')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Player Inventory
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => handle_link_click('player_active_quests')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Player Quests
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"  href="#" onClick={() => handle_link_click('npc_drop_table')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  NPC Drop Table
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={() => handle_link_click('spawned_npc')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Spawned NPCs
                </a>
              </li>
          </ul>
        </div>
      </nav>
  
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">{title}</h1>
        </div>

        <TableInsertBox ref={table_insert_ref}></TableInsertBox>        
        <Table ref={table_ref} refresh={refreshTable} key={table_name} table_name={table_name}></Table>

      </main>
    </div>
  </div>
  </>
  );
}

export default App;
