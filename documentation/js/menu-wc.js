'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">covid-tracing-platform-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-b9bd047624e271ce33017d0a5ad4ac57"' : 'data-target="#xs-components-links-module-AdminModule-b9bd047624e271ce33017d0a5ad4ac57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-b9bd047624e271ce33017d0a5ad4ac57"' :
                                            'id="xs-components-links-module-AdminModule-b9bd047624e271ce33017d0a5ad4ac57"' }>
                                            <li class="link">
                                                <a href="components/BoliviaDatasetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BoliviaDatasetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatasetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatasetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadFileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadFileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-78d7465eaf87aab0c56ac7492a670a7d"' : 'data-target="#xs-components-links-module-AppModule-78d7465eaf87aab0c56ac7492a670a7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-78d7465eaf87aab0c56ac7492a670a7d"' :
                                            'id="xs-components-links-module-AppModule-78d7465eaf87aab0c56ac7492a670a7d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-20f3dad5cc63d2df147b36f5e1d91fcd"' : 'data-target="#xs-components-links-module-AuthModule-20f3dad5cc63d2df147b36f5e1d91fcd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-20f3dad5cc63d2df147b36f5e1d91fcd"' :
                                            'id="xs-components-links-module-AuthModule-20f3dad5cc63d2df147b36f5e1d91fcd"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BoliviaModule.html" data-type="entity-link">BoliviaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BoliviaModule-b55b615ef69ce71f5a2cd8fadc2112a8"' : 'data-target="#xs-components-links-module-BoliviaModule-b55b615ef69ce71f5a2cd8fadc2112a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BoliviaModule-b55b615ef69ce71f5a2cd8fadc2112a8"' :
                                            'id="xs-components-links-module-BoliviaModule-b55b615ef69ce71f5a2cd8fadc2112a8"' }>
                                            <li class="link">
                                                <a href="components/BoliviaPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BoliviaPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientDatasetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientDatasetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BoliviaRoutingModule.html" data-type="entity-link">BoliviaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-78745ffac9bd4fe15a89bde22318f0f2"' : 'data-target="#xs-components-links-module-HomeModule-78745ffac9bd4fe15a89bde22318f0f2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-78745ffac9bd4fe15a89bde22318f0f2"' :
                                            'id="xs-components-links-module-HomeModule-78745ffac9bd4fe15a89bde22318f0f2"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfvaccinationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfvaccinationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecommendationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecommendationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-a9e6be6092aa051c9605471438154165"' : 'data-target="#xs-components-links-module-SharedModule-a9e6be6092aa051c9605471438154165"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-a9e6be6092aa051c9605471438154165"' :
                                            'id="xs-components-links-module-SharedModule-a9e6be6092aa051c9605471438154165"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorldModule.html" data-type="entity-link">WorldModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WorldModule-39b511411dc6a369a88a94aca8816ac1"' : 'data-target="#xs-components-links-module-WorldModule-39b511411dc6a369a88a94aca8816ac1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorldModule-39b511411dc6a369a88a94aca8816ac1"' :
                                            'id="xs-components-links-module-WorldModule-39b511411dc6a369a88a94aca8816ac1"' }>
                                            <li class="link">
                                                <a href="components/WorldPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorldPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorldRoutingModule.html" data-type="entity-link">WorldRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ChartComponent-1.html" data-type="entity-link">ChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapComponent-1.html" data-type="entity-link">MapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableComponent-1.html" data-type="entity-link">TableComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BoliviaService.html" data-type="entity-link">BoliviaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link">CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataRequestService.html" data-type="entity-link">DataRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentService.html" data-type="entity-link">DepartmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link">FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MunicipalityService.html" data-type="entity-link">MunicipalityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link">TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRoleService.html" data-type="entity-link">UserRoleService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Bolivia.html" data-type="entity-link">Bolivia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BoliviaData.html" data-type="entity-link">BoliviaData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BoliviaVaccineData.html" data-type="entity-link">BoliviaVaccineData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Country.html" data-type="entity-link">Country</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CountryList.html" data-type="entity-link">CountryList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Department.html" data-type="entity-link">Department</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DepartmentList.html" data-type="entity-link">DepartmentList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileRequest.html" data-type="entity-link">FileRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginUser.html" data-type="entity-link">LoginUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Municipality.html" data-type="entity-link">Municipality</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorldDetail.html" data-type="entity-link">WorldDetail</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});