import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { clearCourses, getCourses, addACourse, updateACourse, deleteACourse } from 'app/shared/reducers/course';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  // constructor(props) {
  //   super();
  //   this.state = {
  //     showHeader: false
  //   }
  // }
  componentDidMount() {
    this.props.getSession();
  }

  getAllCourses = () => {
    this.props.getCourses();
    //this.state.showHeader= true;
  };
  addCourse = () => {
    this.props.addACourse();
  };
  updateCourse = () => {
    this.props.updateACourse();
  };
  deleteCourse = (e, courseName) => {
    e.preventDefault();
    console.log('delete course ' + courseName);
    this.props.deleteACourse(courseName);
  };
  clearAllCourses = () => {
    this.props.clearCourses();
  };

  render() {
    let { account, courses, showCourse } = this.props;
    console.log(showCourse);
    return (
      <Row>
        <Col md="12">
          <h2>Welcome, 九章全栈ReactSpring项目!</h2>
          <p className="lead">This is your homepage</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
              <button className="btn btn-primary" onClick={this.getAllCourses}>
                显示所有课程
              </button>{' '}
              <button onClick={this.clearAllCourses} className="btn btn-primary">
                清除
              </button>
              <table className="table table-striped table-dark" style={{ margin: '10px 0' }}>
                {/* {courses ?
                  <thead>
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Course Location</th>
                      <th scope="col">Course Content</th>
                      <th scope="col">Teacher Name</th>
                      <th scope="col">Update Course</th>
                      <th scope="col">Delete Course</th>
                    </tr>
                  </thead> : null } */}
                <tbody>
                  {courses &&
                    courses.map((course, key) => (
                      <tr>
                        <td>{course.courseName}</td>
                        <td>{course.courseLocation}</td>
                        <td>{course.courseContent}</td>
                        <td>{course.teacherName}</td>
                        <td>
                          <button className="btn btn-primary" onClick={this.updateCourse}>
                            Update
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger" onClick={e => this.deleteCourse(e, course.courseName)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
          <hr />
          <div>
            <p className="lead">Add a New Course</p>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Name" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Location</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Location" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Content</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Content" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Teacher Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Teacher Name" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Add New Course
              </button>
            </form>
          </div>
          <hr />
          <div>
            <p className="lead">Update Course</p>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Name" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Location</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Location" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Course Content</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Course Content" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Teacher Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" placeholder="Teacher Name" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Course
              </button>
            </form>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  courses: storeState.course.courses,
  showCourse: storeState.course.showCourse
});

const mapDispatchToProps = { getSession, getCourses, addACourse, updateACourse, deleteACourse, clearCourses };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
