/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2021 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Component} from '@angular/core';
import {BooleanDetailFieldComponent} from './boolean.component';
import {Field} from 'common';
import {UserPreferenceStore} from '../../../../store/user-preference/user-preference.store';
import {dateFormatterMock} from '../../../../services/formatters/datetime/date-formatter.service.spec.mock';
import {DateFormatter} from '../../../../services/formatters/datetime/date-formatter.service';
import {HtmlSanitizeModule} from '../../../../pipes/html-sanitize/html-sanitize.module';
import {datetimeFormatterMock} from '../../../../services/formatters/datetime/datetime-formatter.service.spec.mock';
import {CurrencyFormatter} from '../../../../services/formatters/currency/currency-formatter.service';
import {userPreferenceStoreMock} from '../../../../store/user-preference/user-preference.store.spec.mock';
import {DatetimeFormatter} from '../../../../services/formatters/datetime/datetime-formatter.service';
import {numberFormatterMock} from '../../../../services/formatters/number/number-formatter.spec.mock';
import {NumberFormatter} from '../../../../services/formatters/number/number-formatter.service';

@Component({
    selector: 'boolean-detail-field-test-host-component',
    template: '<scrm-boolean-detail [field]="field"></scrm-boolean-detail>'
})
class BooleanDetailFieldTestHostComponent {
    field: Field = {
        type: 'boolean',
        value: 'true'
    };
}

describe('BooleanDetailFieldComponent', () => {
    let testHostComponent: BooleanDetailFieldTestHostComponent;
    let testHostFixture: ComponentFixture<BooleanDetailFieldTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BooleanDetailFieldTestHostComponent,
                BooleanDetailFieldComponent,
            ],
            imports: [
                HtmlSanitizeModule
            ],
            providers: [
                {provide: UserPreferenceStore, useValue: userPreferenceStoreMock},
                {provide: NumberFormatter, useValue: numberFormatterMock},
                {provide: DatetimeFormatter, useValue: datetimeFormatterMock},
                {provide: DateFormatter, useValue: dateFormatterMock},
                {
                    provide: CurrencyFormatter,
                    useValue: new CurrencyFormatter(userPreferenceStoreMock, numberFormatterMock, 'en_us')
                },
            ],
        }).compileComponents();

        testHostFixture = TestBed.createComponent(BooleanDetailFieldTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have checkbox', () => {
        expect(testHostComponent).toBeTruthy();

        testHostComponent.field.value = 'true';

        testHostFixture.detectChanges();
        testHostFixture.whenStable().then(() => {
            const input = testHostFixture.nativeElement.querySelector('input');
            const container = testHostFixture.nativeElement.querySelector('.checkbox-container');

            expect(container).toBeTruthy();
            expect(input).toBeTruthy();
            expect(input.checked).toBeTruthy();
            expect(input.type).toContain('checkbox');
            expect(input.disabled).toBeTruthy();
            expect(input.readOnly).toBeTruthy();
        });

    });

    it('should have update input when field changes', () => {
        expect(testHostComponent).toBeTruthy();

        testHostComponent.field.value = 'true';

        testHostFixture.detectChanges();
        testHostFixture.whenStable().then(() => {
            const input = testHostFixture.nativeElement.querySelector('input');

            expect(input.checked).toBeTruthy();

            testHostComponent.field.value = 'false';

            testHostFixture.detectChanges();
            testHostFixture.whenStable().then(() => {
                expect(input.checked).toBeFalsy();
            });
        });

    });

    it('should not update field when clicked', () => {
        expect(testHostComponent).toBeTruthy();

        testHostComponent.field.value = 'false';

        testHostFixture.detectChanges();
        testHostFixture.whenStable().then(() => {
            const input = testHostFixture.nativeElement.querySelector('input');
            input.click();

            testHostFixture.detectChanges();
            testHostFixture.whenStable().then(() => {
                expect(testHostComponent.field.value).toContain('false');
            });
        });
    });

});