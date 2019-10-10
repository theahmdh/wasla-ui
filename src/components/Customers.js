import React, { Component } from "react";
import DataTable , { memoize } from 'react-data-table-component'
import myConfig from "../config";

export default class Customers extends Component {
  state = {
    customers: [],
    columns: [
      {
        name: '#',
        selector: 'Seq',
        sortable: false,
        width: '50px'
      },
      {
        name: 'Name',
        selector: 'FullName',
        sortable: true,
      },
      {
        name: 'PhoneNumber',
        selector: 'PhoneNumber',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'Email',
        sortable: false,
      },
      {
        name: 'isActive',
        selector: 'isCustomerActive',
        sortable: false,
        cell: (row) => {
          return (
            <input type="checkbox" className="checkbox" defaultChecked= {row.isCustomerActive} disabled  />
          );
        }
      },
      {
        name: 'PromoName',
        selector: 'PromoName',
        sortable: true,
      },
      // {
      //   name: 'isPromoActive',
      //   selector: 'isPromoActive',
      //   sortable: false,
      //   cell: (row) => {
      //     return (
      //       <input type="checkbox" className="checkbox" defaultChecked= {row.isPromoActive} disabled  />
      //     );
      //   }
      // },
      {
        name: 'PromoExpiry',
        selector: 'PromoExpiry',
        sortable: false,
      },
      {
        name: 'PromoCost',
        selector: 'PromoCost',
        sortable: false,
      },
    ]
  };

  getCustomers = () => {
    const backend = myConfig.Backend;
    fetch(`${backend}/customers`)
      .then(res => res.json())
      .then(data => {
        console.log(data.rows);
        this.setState({
          customers: data.rows
        });
      });
  };

  componentDidMount() {
    this.getCustomers();
  }

  render() {
    var customers = this.state.customers;
    if (customers) {
      return (<DataTable style={{ height: '100%' }}
        title="Customers"
        columns={this.state.columns}
        //columns={columns(this.onClickConditions, this.onClickActions)}
        data={customers}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        pagination
        //selectableRows
        highlightOnHover
        //actions = {actions}
      />)
    } else {
      return <div>Loading..</div>;
    }
  }

  // render() {
  //     var customers = this.state.customers;
  //     if(customers.length > 0){
  //   return <div>
  //       <table className="table table-striped">
  //           <thead>
  //               <tr>
  //               <th>ID</th>
  //               <th>Name</th>
  //               <th>Phone</th>
  //               <th>Email</th>
  //               <th>Status</th>
  //               <th>PromoName</th>
  //               <th>isPromoActive</th>
  //               <th>PromoExpiry</th>
  //               <th>PromoCost</th>
  //               </tr>
  //           </thead>
  //           <tbody>
  //           { customers.map(item => (
  //               <tr key={item.Seq}>
  //                   <td>{item.Seq}</td>
  //                   <td>{item.FullName}</td>
  //                   <td>{item.PhoneNumber}</td>
  //                   <td>{item.Email}</td>
  //                   <td>{item.Status}</td>
  //                   <td>{item.PromoName}</td>
  //                   <td>{item.isPromoActive === true ? 'Yes' : 'No'}</td>
  //                   <td>{item.PromoExpiry}</td>
  //                   <td>{item.PromoCost}</td>
  //               </tr>
  //               ))}
  //           </tbody>
  //       </table>
  //       <div>Total customers: { this.state.customers.length }</div>

  //   </div>;
  //     }
  //     else{
  //         return(<div>Loading..</div>);
  //     }
  // }
}
