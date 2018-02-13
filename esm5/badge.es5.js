/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Inject, Input, NgModule, NgZone, Optional } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { A11yModule, AriaDescriber } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var nextId = 0;
/**
 * Directive to display a text badge.
 */
var MatBadge = /** @class */ (function () {
    function MatBadge(_document, _ngZone, _elementRef, _ariaDescriber) {
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._ariaDescriber = _ariaDescriber;
        this._color = 'primary';
        this._overlap = true;
        /**
         * Position the badge should reside.
         * Accepts any combination of 'above'|'below' and 'before'|'after'
         */
        this.position = 'above after';
        /**
         * Size of the badge. Can be 'small', 'medium', or 'large'.
         */
        this.size = 'medium';
        /**
         * Unique id for the badge
         */
        this._id = nextId++;
    }
    Object.defineProperty(MatBadge.prototype, "color", {
        get: /**
         * The color of the badge. Can be `primary`, `accent`, or `warn`.
         * @return {?}
         */
        function () { return this._color; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._setColor(value);
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "overlap", {
        get: /**
         * Whether the badge should overlap its contents or not
         * @return {?}
         */
        function () { return this._overlap; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._overlap = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "content", {
        get: /**
         * The content for the badge
         * @return {?}
         */
        function () { return this._content; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._content = val;
            this._updateTextContent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "description", {
        get: /**
         * Message used to describe the decorated element via aria-describedby
         * @return {?}
         */
        function () { return this._description; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (this._description) {
                this._updateHostAriaDescription(val, this._description);
            }
            this._description = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatBadge.prototype, "hidden", {
        get: /**
         * Whether the badge is hidden.
         * @return {?}
         */
        function () { return this._hidden; },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hidden = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the badge is above the host or not */
    /**
     * Whether the badge is above the host or not
     * @return {?}
     */
    MatBadge.prototype.isAbove = /**
     * Whether the badge is above the host or not
     * @return {?}
     */
    function () {
        return this.position.indexOf('below') === -1;
    };
    /** Whether the badge is after the host or not */
    /**
     * Whether the badge is after the host or not
     * @return {?}
     */
    MatBadge.prototype.isAfter = /**
     * Whether the badge is after the host or not
     * @return {?}
     */
    function () {
        return this.position.indexOf('before') === -1;
    };
    /**
     * Injects a span element into the DOM with the content.
     * @return {?}
     */
    MatBadge.prototype._updateTextContent = /**
     * Injects a span element into the DOM with the content.
     * @return {?}
     */
    function () {
        if (!this._badgeElement) {
            this._badgeElement = this._createBadgeElement();
        }
        else {
            this._badgeElement.textContent = this.content;
        }
        return this._badgeElement;
    };
    /**
     * Creates the badge element
     * @return {?}
     */
    MatBadge.prototype._createBadgeElement = /**
     * Creates the badge element
     * @return {?}
     */
    function () {
        var /** @type {?} */ badgeElement = this._document.createElement('span');
        badgeElement.setAttribute('id', "mat-badge-content-" + this._id);
        badgeElement.classList.add('mat-badge-content');
        badgeElement.textContent = this.content;
        if (this.description) {
            badgeElement.setAttribute('aria-label', this.description);
        }
        this._elementRef.nativeElement.appendChild(badgeElement);
        // animate in after insertion
        this._ngZone.runOutsideAngular(function () {
            return requestAnimationFrame(function () {
                // ensure content available
                if (badgeElement) {
                    badgeElement.classList.add('mat-badge-active');
                }
            });
        });
        return badgeElement;
    };
    /**
     * Sets the aria-label property on the element
     * @param {?} val
     * @param {?} prevVal
     * @return {?}
     */
    MatBadge.prototype._updateHostAriaDescription = /**
     * Sets the aria-label property on the element
     * @param {?} val
     * @param {?} prevVal
     * @return {?}
     */
    function (val, prevVal) {
        // ensure content available before setting label
        var /** @type {?} */ content = this._updateTextContent();
        this._ariaDescriber.removeDescription(content, prevVal);
        this._ariaDescriber.describe(content, val);
    };
    /**
     * Adds css theme class given the color to the component host
     * @param {?} colorPalette
     * @return {?}
     */
    MatBadge.prototype._setColor = /**
     * Adds css theme class given the color to the component host
     * @param {?} colorPalette
     * @return {?}
     */
    function (colorPalette) {
        if (colorPalette !== this._color) {
            if (this._color) {
                this._elementRef.nativeElement.classList.remove("mat-badge-" + this._color);
            }
            if (colorPalette) {
                this._elementRef.nativeElement.classList.add("mat-badge-" + colorPalette);
            }
        }
    };
    MatBadge.decorators = [
        { type: Directive, args: [{
                    selector: '[matBadge]',
                    host: {
                        'class': 'mat-badge',
                        '[class.mat-badge-overlap]': '_overlap',
                        '[class.mat-badge-above]': 'isAbove()',
                        '[class.mat-badge-below]': '!isAbove()',
                        '[class.mat-badge-before]': '!isAfter()',
                        '[class.mat-badge-after]': 'isAfter()',
                        '[class.mat-badge-small]': 'size === "small"',
                        '[class.mat-badge-medium]': 'size === "medium"',
                        '[class.mat-badge-large]': 'size === "large"',
                        '[class.mat-badge-hidden]': 'hidden',
                    },
                },] },
    ];
    /** @nocollapse */
    MatBadge.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
        { type: NgZone, },
        { type: ElementRef, },
        { type: AriaDescriber, },
    ]; };
    MatBadge.propDecorators = {
        "color": [{ type: Input, args: ['matBadgeColor',] },],
        "overlap": [{ type: Input, args: ['matBadgeOverlap',] },],
        "position": [{ type: Input, args: ['matBadgePosition',] },],
        "content": [{ type: Input, args: ['matBadge',] },],
        "description": [{ type: Input, args: ['matBadgeDescription',] },],
        "size": [{ type: Input, args: ['matBadgeSize',] },],
        "hidden": [{ type: Input, args: ['matBadgeHidden',] },],
    };
    return MatBadge;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatBadgeModule = /** @class */ (function () {
    function MatBadgeModule() {
    }
    MatBadgeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        MatCommonModule,
                        A11yModule,
                    ],
                    exports: [
                        MatBadge,
                    ],
                    declarations: [
                        MatBadge,
                    ],
                },] },
    ];
    /** @nocollapse */
    MatBadgeModule.ctorParameters = function () { return []; };
    return MatBadgeModule;
}());

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

export { MatBadgeModule, MatBadge };
//# sourceMappingURL=badge.es5.js.map
