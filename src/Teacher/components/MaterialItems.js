import React, { Component } from "react";

export default class MaterialItems extends Component {
  render() {
    return (
      <div>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-lg-12 col-sm-12">
                <div class="card">
                  <div class="card-header card-header-primary">
                    <h4 class="card-title ">Materials List </h4>

                    <p class="card-category">
                      {" "}
                      Here is a list of all Materials
                    </p>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table">
                        <thead class=" text-primary">
                          <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Operator Overloading </td>
                            <td>12/12/21</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Class In ooP </td>
                            <td>10/12/21</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Funcations </td>
                            <td>10/12/21</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Inheritence </td>
                            <td>09/11/21</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Pointers </td>
                            <td>08/10/21</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
