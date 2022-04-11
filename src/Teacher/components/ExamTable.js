import React, { Component } from "react";

export default class ExamTable extends Component {
  render() {
    return (
      <div>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-lg-12 col-sm-12">
                <div class="card">
                  <div class="card-header card-header-primary">
                    <h4 class="card-title ">Exam List </h4>

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
                            <th>No.</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Section</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Funcations Overloading </td>
                            <td>12/12/21</td>
                            <td>8A</td>
                            <td>1:00 PM</td>
                            <td>1:30 PM </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Classes in OOP </td>
                            <td>06/12/21</td>
                            <td>8F</td>
                            <td>10:00 PM</td>
                            <td>10:30 PM </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Pointers </td>
                            <td>02/12/21</td>
                            <td>8B</td>
                            <td>11:00 PM</td>
                            <td>11:30 PM </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Inheritence </td>
                            <td>29/11/21</td>
                            <td>8C</td>
                            <td>9:00 PM</td>
                            <td>9:30 PM </td>
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
