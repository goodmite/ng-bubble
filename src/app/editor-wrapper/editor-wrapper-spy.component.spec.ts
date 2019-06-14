import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {EditorWrapperComponent} from './editor-wrapper.component';
import {AppComponent} from '../app.component';
import {JsbEditorComponent} from './jsb-editor/jsb-editor.component';
import {JsbEditorSidebarComponent} from './jsb-editor-sidebar/jsb-editor-sidebar.component';
import {EditorHeaderComponent} from './editor-header/editor-header.component';
import {JsonParsePipe} from '../json-parse.pipe';
import {GetObjectKeyPipe} from '../get-object-key.pipe';
import {FileSearchPanelComponent} from './file-search-panel/file-search-panel.component';
import {ImageByExtensionPipe} from './file-search-panel/image-by-extension.pipe';
import {TestComponent} from '../test/test.component';
import {MenuComponent} from './menu/menu.component';
import {ObjectTrayComponent} from './object-tray/object-tray.component';
import {ObjectKeyComponent} from './object-tray/object-key/object-key.component';
import {ObjectDetailComponent} from './object-tray/object-detail/object-detail.component';
import {ObjectByPathPipe} from '../object-by-path.pipe';
import {JsConsoleComponent} from './js-console/js-console.component';
import {DataTypePipe} from '../data-type.pipe';
import {ObjectByProbablePathPipe} from '../object-by-probable-path.pipe';
import {SortObjectPipe} from '../sort-object.pipe';
import {ChangedPrefixComponent} from '../changed-prefix/changed-prefix.component';
import {MinimizePlaceholderComponent} from './minimize-placeholder/minimize-placeholder.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';
import {ResizableModule} from 'angular-resizable-element';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {HttpClientModule} from '@angular/common/http';
import {configure} from '../testing-utils1/configure.spec';
import {PageSpec} from '../testing-utils1/page.spec';
import {checkSpyOnClick} from '../testing-utils1/utility.spec';
import {EDataCy} from '../data-cy';
import {FakeDataSpec} from '../testing-utils1/fake-data.spec';

fdescribe('EditorWrapperComponent existence', () => {
  // let component: EditorWrapperComponent;
  let fixture: ComponentFixture<EditorWrapperComponent>;
  let page;
  configure({
    declarations: [
      AppComponent,
      EditorWrapperComponent,
      JsbEditorComponent,
      JsbEditorSidebarComponent,
      EditorHeaderComponent,
      JsonParsePipe,
      GetObjectKeyPipe,
      FileSearchPanelComponent,
      ImageByExtensionPipe,
      TestComponent,
      MenuComponent,
      ObjectTrayComponent,
      ObjectKeyComponent,
      ObjectDetailComponent,
      ObjectByPathPipe,
      JsConsoleComponent,
      DataTypePipe,
      ObjectByProbablePathPipe,
      SortObjectPipe,
      ChangedPrefixComponent,
      MinimizePlaceholderComponent,
      JsbEditorSidebarComponent,
      EditorHeaderComponent,
    ],
    imports: [
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ClickOutsideModule,
      ResizableModule,
      NgxJsonViewerModule,
      HttpClientModule
    ],
  });
  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWrapperComponent);
    page = new PageSpec(fixture);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  fit('should call logCurrentData method when console_log(sidebar) is clicked', fakeAsync(() => {
    fixture.componentInstance.minimize = false;
    fixture.detectChanges();
    const source = EDataCy.sidebar_log;
    checkSpyOnClick(fixture, page, source, 'logCurrentData');
  }));
  fit('should call shutDown$.emit method when console_log(sidebar) is clicked', fakeAsync(() => {
    fixture.componentInstance.minimize = false;
    fixture.detectChanges();
    const source = EDataCy.sidebar_off;
    checkSpyOnClick(fixture, page, source, 'shutDown$.emit');
  }));

  fit(`should call openInIde$.emit method when ${EDataCy.sidebar_ide} is clicked`, fakeAsync(() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance._status = {connection: true};
    fixture.componentInstance.isLoading = false;
    fixture.componentInstance._componentfiles = FakeDataSpec._componentfiles;
    fixture.detectChanges();
    const source = EDataCy.sidebar_ide;
    checkSpyOnClick(fixture, page, source, 'openInIde$.emit');
  }));

  afterEach((() => {
    fixture.destroy();
    // flush();
  }));

  afterAll((
    () => {

      TestBed.resetTestingModule = oldResetTestingModule;
      TestBed.resetTestingModule();
    }
  ));
});