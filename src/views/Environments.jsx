import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import CButton from "components/CustomButton/CustomButton.jsx";
import EnvironmentForm from "components/Environments/EnvironmentForm.jsx";
import SimpleModal from "components/Modal/SimpleModal.jsx";
import EnvironmentCard from "components/Card/EnvironmentCard.jsx";
import axios from "axios";
import TENKAI_API_URL from "env.js";

import * as environmentActions from "stores/environment/actions";
import * as environmentSelectors from "stores/environment/reducer";

class Environments extends Component {
  state = {
    showInsertUpdateForm: false,
    envResult: { Envs: [] },
    inputFilter: "",
    showConfirmDeleteModal: false,
    showConfirmDuplicateModal: false,
    itemToDelete: {},
    itemToDuplicate: {}
  };

  componentDidMount() {
    this.props.dispatch(environmentActions.allEnvironments());
  }

  navigateToEnvironmentVariables(id, group, name) {
    this.props.history.push({
      pathname: "/admin/environments-envvars",
      search: "?id=" + id,
      state: { item: { group: group, name: name } }
    });
  }

  navigateToEditEnvironment(item) {
    this.setState({
      showInsertUpdateForm: true,
      editItem: item,
      editMode: true
    });
    window.scrollTo(0, 0);
  }

  async onSaveClick(data) {
    this.props.handleLoading(true);
    if (this.state.editMode) {
      await this.props.dispatch(environmentActions.editEnvironment(data));
    } else {
      await this.props.dispatch(environmentActions.createEnvironment(data));
    }

    this.props.handleLoading(false);
    this.setState({
      showInsertUpdateForm: false,
      editItem: {},
      editMode: false
    });
  }

  async duplicateEnvironment(item) {
    this.props.handleLoading(true);
    if (item !== undefined) {
      await this.props.dispatch(
        environmentActions.duplicateEnvironment(item.ID)
      );

      this.props.handleLoading(false);
      this.setState({ showConfirmDuplicateModal: false });
    }
  }

  async onDelete(item) {
    this.props.handleLoading(true);
    if (item !== undefined) {
      await this.props.dispatch(environmentActions.deleteEnvironment(item.ID));

      this.props.handleLoading(false);
      this.setState({ showConfirmDeleteModal: false });
    }
  }

  onExport(item) {
    axios
      .get(TENKAI_API_URL + `/environments/export/${item.ID}`)
      .then(function(response) {
        console.log("aqui X");
        console.log(response.data);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `environment_${item.group}_${item.name}.txt`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch(function(error) {
        console.log(error.message);
        this.props.handleNotification("general_fail", "error");
      });
  }

  render() {
    const items = this.state.envResult.Envs.filter(
      d =>
        this.state.inputFilter === "" || d.name.includes(this.state.inputFilter)
    ).map((item, key) => (
      <EnvironmentCard
        key={item.ID}
        id={item.id}
        keycloak={this.props.keycloak}
        item={item}
        group={item.group}
        name={item.name}
        clusterUri={item.cluster_uri}
        namespace={item.namespace}
        navigateToEditEnvironment={this.navigateToEditEnvironment.bind(this)}
        navigateToEnvironmentVariables={this.navigateToEnvironmentVariables.bind(
          this
        )}
        duplicateEnvironment={this.duplicateEnvironment.bind(this)}
        onDelete={this.onDelete.bind(this)}
        onExport={this.onExport.bind(this)}
      />
    ));

    return (
      <div className="content">
        <SimpleModal
          showConfirmDeleteModal={this.state.showConfirmDeleteModal}
          handleConfirmDeleteModalClose={() =>
            this.setState({ showConfirmDeleteModal: false, itemToDelete: {} })
          }
          title="Confirm"
          subTitle="Delete environment"
          message="Are you sure you want to delete this environment?"
          handleConfirmDelete={this.handleConfirmDelete.bind(this)}
        ></SimpleModal>

        <SimpleModal
          showConfirmDeleteModal={this.state.showConfirmDuplicateModal}
          handleConfirmDeleteModalClose={() =>
            this.setState({
              showConfirmDuplicateModal: false,
              itemToDuplicate: {}
            })
          }
          title="Confirm"
          subTitle="Duplicate environment"
          message="Are you sure you want to duplicate this environment?"
          handleConfirmDelete={this.handleConfirmDuplicate.bind(this)}
        ></SimpleModal>

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <form>
                    <CButton
                      disabled={
                        !this.props.keycloak.hasRealmRole("tenkai-admin")
                      }
                      className="pull-right"
                      variant="primary"
                      onClick={e =>
                        this.setState({
                          showInsertUpdateForm: true,
                          editItem: {},
                          editMode: false
                        })
                      }
                    >
                      New Environment
                    </CButton>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {this.state.showInsertUpdateForm ? (
                <EnvironmentForm
                  editMode={this.state.editMode}
                  editItem={this.state.editItem}
                  saveClick={this.onSaveClick.bind(this)}
                  cancelClick={e =>
                    this.setState({
                      showInsertUpdateForm: false,
                      editItem: {},
                      editMode: false
                    })
                  }
                />
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                plain
                title="Environments"
                content={
                  <form>
                    <Row>
                      <Col xs={8}>
                        <FormGroup>
                          <ControlLabel>Environment Search</ControlLabel>
                          <FormControl
                            value={this.state.inputFilter}
                            onChange={e =>
                              this.setState({ inputFilter: e.target.value })
                            }
                            style={{ width: "100%" }}
                            type="text"
                            placeholder="Search using any field"
                            aria-label="Search using any field"
                          ></FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={8}>{items}</Col>
                    </Row>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: environmentSelectors.getLoading(state),
  environments: environmentSelectors.getEnvironments(state),
  error: environmentSelectors.getError(state)
});

export default connect(mapStateToProps)(Environments);
