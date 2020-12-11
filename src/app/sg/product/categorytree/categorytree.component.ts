import { CategoryService } from 'src/app/_services/category.service';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Injectable, Input, OnChanges, Output} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/** Flat node with expandable and level information */
export class CategoryFlatNode {
  constructor(
    public name: string,
    public _id: string,
    public parent: string,
    public level = 1,
    public expandable = false,
    public isLoading = false
    ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  constructor(
    private sCategory: CategoryService
  ){ }

  /** Initial data from database */
  initialData() {
     return this.sCategory.getProductCategoryList().subscribe(r => {
       r.map(x => new CategoryFlatNode(x.name, x._id, x.parent, 0, true));
    })
  }

  getChildren(_id: string): Observable<any> {
    return this.sCategory.getProductSub(_id);
  }


}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DynamicDataSource implements DataSource<any> {

  dataChange = new BehaviorSubject<CategoryFlatNode[]>([]);

  get data(): CategoryFlatNode[] { return this.dataChange.value; }
  set data(value: CategoryFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<CategoryFlatNode>,
              private _database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<CategoryFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<CategoryFlatNode>).added ||
        (change as SelectionChange<CategoryFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<CategoryFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<CategoryFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: CategoryFlatNode, expand: boolean) {
    let children;
    node.isLoading = true;
    this._database.getChildren(node._id).subscribe(r => {
      node.isLoading = false;
      children = r;
      if (expand) {
        const nodes = children.map(r =>
          new CategoryFlatNode(r.name, r._id, r.parent, node.level + 1, r.total > 0));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }


  }
}

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'tree-dynamic-example',
  templateUrl: 'tree-dynamic-example.html',
  styleUrls: ['tree-dynamic-example.scss']
})
export class TreeDynamicExample implements OnChanges {
  @Output() OutputCategories = new EventEmitter<string[]>();
  @Input() InputCategories: string[];
  @Input() show: boolean;
  public statusShow = false;
  @Output() status =  new EventEmitter<boolean>();
  private selectedCategories: string[] = [];
  constructor(
    database: DynamicDatabase,
    private sCategory: CategoryService
    ) {
    this.treeControl = new FlatTreeControl<any>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.sCategory.getProductCategoryList().subscribe(r => {
      this.dataSource.data =  r.map(x => new CategoryFlatNode(x.name, x._id, x.parent, 0, true));
    })

  }

  treeControl: FlatTreeControl<CategoryFlatNode>;

  dataSource: any;

  checkSelect(node){
    const index = this.selectedCategories.findIndex(x => x == node._id);
    if(index >= 0) return true;
    return false;
  }

  close(){
    this.status.emit(false);
  }

  selectCategory(node){
    if(this.selectedCategories.length < 0){
      this.selectedCategories.push(node._id);
    } else {
      const index = this.selectedCategories.findIndex(x => x == node._id);
      if(index >= 0){
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(node._id);
      }
    }
    console.log(this.selectedCategories);
    this.OutputCategories.emit(this.selectedCategories);
  }

  ngOnChanges(){
    if(this.InputCategories.length > 0){
      this.selectedCategories = this.InputCategories;
    }
    this.statusShow = this.show;
  }

  getLevel = (node: CategoryFlatNode) => node.level;

  isExpandable = (node: CategoryFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;
}
