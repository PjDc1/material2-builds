/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '@angular/core';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkTable } from '@angular/cdk/table';
import '@angular/common';
import '@angular/material/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { empty } from 'rxjs/observable/empty';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Workaround for https://github.com/angular/angular/issues/17849
 */
const _MatTable = CdkTable;
/**
 * Wrapper for the CdkTable with Material design styles.
 */
class MatTable extends _MatTable {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Workaround for https://github.com/angular/angular/issues/17849
 */
const _MatCellDef = CdkCellDef;
const _MatHeaderCellDef = CdkHeaderCellDef;
const _MatColumnDef = CdkColumnDef;
const _MatHeaderCell = CdkHeaderCell;
const _MatCell = CdkCell;
/**
 * Cell definition for the mat-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
class MatCellDef extends _MatCellDef {
}
/**
 * Header cell definition for the mat-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
class MatHeaderCellDef extends _MatHeaderCellDef {
}
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
class MatColumnDef extends _MatColumnDef {
}
/**
 * Header cell template container that adds the right classes and role.
 */
class MatHeaderCell extends _MatHeaderCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `mat-column-${columnDef.cssClassFriendlyName}`);
    }
}
/**
 * Cell template container that adds the right classes and role.
 */
class MatCell extends _MatCell {
    /**
     * @param {?} columnDef
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(columnDef, elementRef, renderer) {
        super(columnDef, elementRef, renderer);
        renderer.addClass(elementRef.nativeElement, `mat-column-${columnDef.cssClassFriendlyName}`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Workaround for https://github.com/angular/angular/issues/17849
 */
const _MatHeaderRowDef = CdkHeaderRowDef;
const _MatCdkRowDef = CdkRowDef;
const _MatHeaderRow = CdkHeaderRow;
const _MatRow = CdkRow;
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
class MatHeaderRowDef extends _MatHeaderRowDef {
}
/**
 * Data row definition for the mat-table.
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
class MatRowDef extends _MatCdkRowDef {
}
/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
class MatHeaderRow extends _MatHeaderRow {
}
/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
class MatRow extends _MatRow {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatTableModule {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 */
class MatTableDataSource {
    /**
     * @param {?=} initialData
     */
    constructor(initialData = []) {
        this._data = new BehaviorSubject(initialData);
        this._updateChangeSubscription();
    }
    /**
     * Array of data that should be rendered by the table, where each object represents one row.
     * @param {?} data
     * @return {?}
     */
    set data(data) { this._data.next(data); }
    /**
     * @return {?}
     */
    get data() { return this._data.value; }
    /**
     * Filter term that should be used to filter out objects from the data array. To override how
     * data objects match to this filter string, provide a custom function for filterPredicate.
     * @param {?} filter
     * @return {?}
     */
    set filter(filter) { this._filter.next(filter); }
    /**
     * @return {?}
     */
    get filter() { return this._filter.value; }
    /**
     * Instance of the MatSort directive used by the table to control its sorting. Sort changes
     * emitted by the MatSort will trigger an update to the table's rendered data.
     * @param {?} sort
     * @return {?}
     */
    set sort(sort) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get sort() { return this._sort; }
    /**
     * Instance of the MatPaginator component used by the table to control what page of the data is
     * displayed. Page changes emitted by the MatPaginator will trigger an update to the
     * table's rendered data.
     *
     * Note that the data source uses the paginator's properties to calculate which page of data
     * should be displayed. If the paginator receives its properties as template inputs,
     * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
     * initialized before assigning it to this data source.
     * @param {?} paginator
     * @return {?}
     */
    set paginator(paginator) {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     * @return {?}
     */
    _updateChangeSubscription() {
        // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
        // Otherwise, use an empty observable stream to take their place.
        const /** @type {?} */ sortChange = this._sort ? this._sort.sortChange : empty();
        const /** @type {?} */ pageChange = this._paginator ? this._paginator.page : empty();
        if (this._renderChangesSubscription) {
            this._renderChangesSubscription.unsubscribe();
        }
        // Watch for base data or filter changes to provide a filtered set of data.
        this._renderChangesSubscription = this._data.pipe(combineLatest(this._filter), map(([data]) => this._filterData(data)), 
        // Watch for filtered data or sort changes to provide an ordered set of data.
        combineLatest(sortChange.pipe(startWith(/** @type {?} */ ((null))))), map(([data]) => this._orderData(data)), 
        // Watch for ordered data or page changes to provide a paged set of data.
        combineLatest(pageChange.pipe(startWith(/** @type {?} */ ((null))))), map(([data]) => this._pageData(data)))
            .subscribe(data => this._renderData.next(data));
    }
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     * @param {?} data
     * @return {?}
     */
    _filterData(data) {
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overriden for customization.
        this.filteredData =
            !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));
        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }
        return this.filteredData;
    }
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     * @param {?} data
     * @return {?}
     */
    _orderData(data) {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort || !this.sort.active || this.sort.direction == '') {
            return data;
        }
        const /** @type {?} */ active = this.sort.active;
        const /** @type {?} */ direction = this.sort.direction;
        return data.slice().sort((a, b) => {
            let /** @type {?} */ valueA = this.sortingDataAccessor(a, active);
            let /** @type {?} */ valueB = this.sortingDataAccessor(b, active);
            return (valueA < valueB ? -1 : 1) * (direction == 'asc' ? 1 : -1);
        });
    }
    /**
     * Returns a paged splice of the provided data array according to the provided MatPaginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     * @param {?} data
     * @return {?}
     */
    _pageData(data) {
        if (!this.paginator) {
            return data;
        }
        const /** @type {?} */ startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice().splice(startIndex, this.paginator.pageSize);
    }
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     * @param {?} filteredDataLength
     * @return {?}
     */
    _updatePaginator(filteredDataLength) {
        Promise.resolve().then(() => {
            if (!this.paginator) {
                return;
            }
            this.paginator.length = filteredDataLength;
            // If the page index is set beyond the page, reduce it to the last page.
            if (this.paginator.pageIndex > 0) {
                const /** @type {?} */ lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
                this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
            }
        });
    }
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * \@docs-private
     * @return {?}
     */
    connect() { return this._renderData; }
    /**
     * Used by the MatTable. Called when it is destroyed. No-op.
     * \@docs-private
     * @return {?}
     */
    disconnect() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MatTableModule, _MatCellDef, _MatHeaderCellDef, _MatColumnDef, _MatHeaderCell, _MatCell, MatCellDef, MatHeaderCellDef, MatColumnDef, MatHeaderCell, MatCell, _MatTable, MatTable, _MatHeaderRowDef, _MatCdkRowDef, _MatHeaderRow, _MatRow, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatRow, MatTableDataSource };
//# sourceMappingURL=table.js.map
