// 选项卡切换功能
function openTab(tabId) {
    // 隐藏所有选项卡内容
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // 取消所有选项卡按钮的激活状态
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // 显示选中的选项卡内容
    document.getElementById(tabId).classList.add('active');
    
    // 激活对应的选项卡按钮
    const activeTabIndex = parseInt(tabId.replace('tab', '')) - 1;
    tabButtons[activeTabIndex].classList.add('active');
}

// 计算总价功能
function calculateTotal() {
    let subtotal = 0;
    
    // 计算每行的总价
    for (let i = 1; i <= 10; i++) {
        const quantity = parseFloat(document.getElementById(`quantity${i}`).value) || 0;
        const price = parseFloat(document.getElementById(`price${i}`).value) || 0;
        const total = quantity * price;
        
        // 保留三位小数
        const formattedTotal = total.toFixed(3);
        document.getElementById(`total${i}`).textContent = formattedTotal;
        
        subtotal += total;
    }
    
    // 显示小计
    const formattedSubtotal = subtotal.toFixed(3);
    document.getElementById('subtotal').textContent = formattedSubtotal;
    
    // 计算最终报价
    const finalRate = parseFloat(document.getElementById('finalRate').value) || 0;
    const finalTotal = subtotal * finalRate;
    const formattedFinalTotal = finalTotal.toFixed(3);
    document.getElementById('finalTotal').textContent = formattedFinalTotal;
}

// 辅件计算功能
function calculateAccessories() {
    // 获取输入值
    const rollerLength = parseFloat(document.getElementById('rollerLength').value) || 0;
    const rollerSpacing = parseFloat(document.getElementById('rollerSpacing').value) || 100;
    
    // 计算机架长度: 无动力辊道机的长度*2/1000
    const frameLength = (rollerLength * 2) / 1000;
    document.getElementById('frameLength').value = frameLength.toFixed(3);
    
    // 计算辊筒数量: 无动力辊道机的长度/1000/无动力辊道机的间距四舍五入取整
    const rollerCount = Math.round((rollerLength / 1000) / (rollerSpacing / 1000));
    document.getElementById('rollerCount').value = rollerCount;
    
    // 计算支腿数量
    let legCount = 0;
    if (rollerLength === 0 || isNaN(rollerLength)) {
        legCount = 0; // 当长度为0或为空时，支腿数量为0
    } else if (rollerLength < 350) {
        legCount = 1; // 当长度小于350mm时，支腿数量为1
    } else if (rollerLength >= 350 && rollerLength <= 2499.9999) {
        legCount = 2; // 当长度大于等于350mm且小于等于2499.9999mm时，支腿为2副
    } else if (rollerLength >= 2500 && rollerLength < 3000) {
        legCount = 3; // 当长度大于等于2500mm且小于3000mm时，支腿为3副
    } else if (rollerLength >= 3000) {
        // 当长度大于等于3000mm时，支腿数量 = 无动力辊道机长度 ÷ 1500 取整数 + 1
        legCount = Math.floor(rollerLength / 1500) + 1;
    }
    document.getElementById('legCount').value = legCount;
}

// 应用计算结果到报价表
function applyToTable() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('frameLength').value) || 0;
    const rollerCount = parseFloat(document.getElementById('rollerCount').value) || 0;
    const legCount = parseFloat(document.getElementById('legCount').value) || 0;
    
    // 应用到报价表
    document.getElementById('quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('quantity2').value = rollerCount.toFixed(3); // 辊筒
    document.getElementById('quantity3').value = legCount.toFixed(3);    // 支腿
    
    // 重新计算总价
    calculateTotal();
}

// =================== 多楔带辊道机功能 ===================

// 计算多楔带辊道机总价功能
function calculateVBeltTotal() {
    let subtotal = 0;
    
    // 计算每行的总价
    for (let i = 1; i <= 14; i++) {
        const quantity = parseFloat(document.getElementById(`vbelt_quantity${i}`).value) || 0;
        const price = parseFloat(document.getElementById(`vbelt_price${i}`).value) || 0;
        const total = quantity * price;
        
        // 保留三位小数
        const formattedTotal = total.toFixed(3);
        document.getElementById(`vbelt_total${i}`).textContent = formattedTotal;
        
        subtotal += total;
    }
    
    // 显示小计
    const formattedSubtotal = subtotal.toFixed(3);
    document.getElementById('vbelt_subtotal').textContent = formattedSubtotal;
    
    // 计算最终报价
    const finalRate = parseFloat(document.getElementById('vbelt_finalRate').value) || 0;
    const finalTotal = subtotal * finalRate;
    const formattedFinalTotal = finalTotal.toFixed(3);
    document.getElementById('vbelt_finalTotal').textContent = formattedFinalTotal;
}

// 多楔带辊道机辅件计算功能
function calculateVBeltAccessories() {
    // 获取输入值
    const rollerLength = parseFloat(document.getElementById('vbelt_rollerLength').value) || 0;
    const rollerSpacing = parseFloat(document.getElementById('vbelt_rollerSpacing').value) || 100;
    const useElectricRoller = document.getElementById('vbelt_useElectricRoller').checked;
    
    // 计算机架长度: 多楔带辊道机的长度*2/1000
    const frameLength = (rollerLength * 2) / 1000;
    document.getElementById('vbelt_frameLength').value = frameLength.toFixed(3);
    
    // 计算辊筒数量，根据是否使用电滚筒决定
    let rollerCount = Math.round((rollerLength / 1000) / (rollerSpacing / 1000));
    
    // 如果使用电滚筒，辊筒数量需要减1
    if (useElectricRoller && rollerCount > 0) {
        rollerCount -= 1;
    }
    
    document.getElementById('vbelt_rollerCount').value = rollerCount;
    
    // 计算支腿数量
    let legCount = 0;
    if (rollerLength === 0 || isNaN(rollerLength)) {
        legCount = 0; // 当长度为0或为空时，支腿数量为0
    } else if (rollerLength < 350) {
        legCount = 1; // 当长度小于350mm时，支腿数量为1
    } else if (rollerLength >= 350 && rollerLength <= 2499.9999) {
        legCount = 2; // 当长度大于等于350mm且小于等于2499.9999mm时，支腿为2副
    } else if (rollerLength >= 2500 && rollerLength < 3000) {
        legCount = 3; // 当长度大于等于2500mm且小于3000mm时，支腿为3副
    } else if (rollerLength >= 3000) {
        // 当长度大于等于3000mm时，支腿数量 = 多楔带辊道机长度 ÷ 1500 取整数 + 1
        legCount = Math.floor(rollerLength / 1500) + 1;
    }
    document.getElementById('vbelt_legCount').value = legCount;
    
    // 计算皮带数量 = 多楔带辊道机的长度 ÷ 1000 ÷ 多楔带辊道机的间距（四舍五入取整）
    const beltCount = Math.round((rollerLength / 1000) / (rollerSpacing / 1000));
    document.getElementById('vbelt_beltCount').value = beltCount;
    
    // 计算链罩长度 = 多楔带辊道机的长度 ÷ 1000
    const chainCoverLength = rollerLength / 1000;
    document.getElementById('vbelt_chainCoverLength').value = chainCoverLength.toFixed(3);
    
    // 计算护栏长度 = 多楔带辊道机的长度 × 2 ÷ 1000（与机架长度计算方式一致）
    const railLength = (rollerLength * 2) / 1000;
    document.getElementById('vbelt_railLength').value = railLength.toFixed(3);
    
    // 计算扣板数量 = 多楔带辊道机的长度 × 2 ÷ 1000
    const plateCount = (rollerLength * 2) / 1000;
    document.getElementById('vbelt_plateCount').value = plateCount.toFixed(3);
}

// 应用多楔带辊道机计算结果到报价表
function applyVBeltToTable() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('vbelt_frameLength').value) || 0;
    const rollerCount = parseFloat(document.getElementById('vbelt_rollerCount').value) || 0;
    const legCount = parseFloat(document.getElementById('vbelt_legCount').value) || 0;
    const beltCount = parseFloat(document.getElementById('vbelt_beltCount').value) || 0;
    const chainCoverLength = parseFloat(document.getElementById('vbelt_chainCoverLength').value) || 0;
    const railLength = parseFloat(document.getElementById('vbelt_railLength').value) || 0;
    const plateCount = parseFloat(document.getElementById('vbelt_plateCount').value) || 0;
    const useElectricRoller = document.getElementById('vbelt_useElectricRoller').checked;
    
    // 应用到报价表
    document.getElementById('vbelt_quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('vbelt_quantity2').value = rollerCount.toFixed(3); // 辊筒
    document.getElementById('vbelt_quantity3').value = legCount.toFixed(3);    // 支腿
    document.getElementById('vbelt_quantity4').value = chainCoverLength.toFixed(3); // 链罩
    document.getElementById('vbelt_quantity6').value = railLength.toFixed(3); // 护栏
    document.getElementById('vbelt_quantity8').value = beltCount.toFixed(3);  // 皮带
    document.getElementById('vbelt_quantity12').value = plateCount.toFixed(3); // 扣板现在是第12项
    
    // 设置驱动架数量，如果使用电滚筒则为0，否则为1
    const driveCount = useElectricRoller ? "0.000" : "1.000";
    document.getElementById('vbelt_quantity5').value = driveCount;  // 驱动架现在是第5项
    
    // 重新计算总价
    calculateVBeltTotal();
}

// =================== 双链辊道机功能 ===================

// 计算双链辊道机总价功能
function calculateDChainTotal() {
    let subtotal = 0;
    
    // 计算每行的总价
    for (let i = 1; i <= 14; i++) {
        const quantity = parseFloat(document.getElementById(`dchain_quantity${i}`).value) || 0;
        const price = parseFloat(document.getElementById(`dchain_price${i}`).value) || 0;
        const total = quantity * price;
        
        // 保留三位小数
        const formattedTotal = total.toFixed(3);
        document.getElementById(`dchain_total${i}`).textContent = formattedTotal;
        
        subtotal += total;
    }
    
    // 显示小计
    const formattedSubtotal = subtotal.toFixed(3);
    document.getElementById('dchain_subtotal').textContent = formattedSubtotal;
    
    // 计算最终报价
    const finalRate = parseFloat(document.getElementById('dchain_finalRate').value) || 0;
    const finalTotal = subtotal * finalRate;
    const formattedFinalTotal = finalTotal.toFixed(3);
    document.getElementById('dchain_finalTotal').textContent = formattedFinalTotal;
}

// 双链辊道机辅件计算功能
function calculateDChainAccessories() {
    // 获取输入值
    const rollerLength = parseFloat(document.getElementById('dchain_rollerLength').value) || 0;
    const rollerSpacing = parseFloat(document.getElementById('dchain_rollerSpacing').value) || 100;
    
    // 计算机架长度: 双链辊道机的长度*2/1000
    const frameLength = (rollerLength * 2) / 1000;
    document.getElementById('dchain_frameLength').value = frameLength.toFixed(3);
    
    // 计算辊筒数量: 双链辊道机的长度/1000/双链辊道机的间距四舍五入取整
    const rollerCount = Math.round((rollerLength / 1000) / (rollerSpacing / 1000));
    document.getElementById('dchain_rollerCount').value = rollerCount;
    
    // 计算支腿数量
    let legCount = 0;
    if (rollerLength === 0 || isNaN(rollerLength)) {
        legCount = 0; // 当长度为0或为空时，支腿数量为0
    } else if (rollerLength < 350) {
        legCount = 1; // 当长度小于350mm时，支腿数量为1
    } else if (rollerLength >= 350 && rollerLength <= 2499.9999) {
        legCount = 2; // 当长度大于等于350mm且小于等于2499.9999mm时，支腿为2副
    } else if (rollerLength >= 2500 && rollerLength < 3000) {
        legCount = 3; // 当长度大于等于2500mm且小于3000mm时，支腿为3副
    } else if (rollerLength >= 3000) {
        // 当长度大于等于3000mm时，支腿数量 = 双链辊道机长度 ÷ 1500 取整数 + 1
        legCount = Math.floor(rollerLength / 1500) + 1;
    }
    document.getElementById('dchain_legCount').value = legCount;
    
    // 计算链条长度 = 双链辊道机的长度 × 4 ÷ 1000
    const chainLength = (rollerLength * 4) / 1000;
    document.getElementById('dchain_chainLength').value = chainLength.toFixed(3);
    
    // 计算链罩长度 = 双链辊道机的长度 ÷ 1000
    const chainCoverLength = rollerLength / 1000;
    document.getElementById('dchain_chainCoverLength').value = chainCoverLength.toFixed(3);
    
    // 计算护栏长度 = 双链辊道机的长度 × 2 ÷ 1000（与机架长度计算方式一致）
    const railLength = (rollerLength * 2) / 1000;
    document.getElementById('dchain_railLength').value = railLength.toFixed(3);
    
    // 计算扣板数量 = 双链辊道机的长度 × 2 ÷ 1000
    const plateCount = (rollerLength * 2) / 1000;
    document.getElementById('dchain_plateCount').value = plateCount.toFixed(3);
}

// 应用双链辊道机计算结果到报价表
function applyDChainToTable() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('dchain_frameLength').value) || 0;
    const rollerCount = parseFloat(document.getElementById('dchain_rollerCount').value) || 0;
    const legCount = parseFloat(document.getElementById('dchain_legCount').value) || 0;
    const chainLength = parseFloat(document.getElementById('dchain_chainLength').value) || 0;
    const chainCoverLength = parseFloat(document.getElementById('dchain_chainCoverLength').value) || 0;
    const railLength = parseFloat(document.getElementById('dchain_railLength').value) || 0;
    const plateCount = parseFloat(document.getElementById('dchain_plateCount').value) || 0;
    
    // 应用到报价表
    document.getElementById('dchain_quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('dchain_quantity2').value = rollerCount.toFixed(3); // 辊筒
    document.getElementById('dchain_quantity3').value = legCount.toFixed(3);    // 支腿
    document.getElementById('dchain_quantity4').value = chainCoverLength.toFixed(3); // 链罩
    document.getElementById('dchain_quantity6').value = railLength.toFixed(3);  // 护栏
    document.getElementById('dchain_quantity8').value = chainLength.toFixed(3); // 链条
    document.getElementById('dchain_quantity12').value = plateCount.toFixed(3); // 扣板
    
    // 驱动架保持为1，不需要修改
    
    // 重新计算总价
    calculateDChainTotal();
}

// =================== 皮带输送机功能 ===================

// 计算皮带输送机总价功能
function calculateBeltTotal() {
    let subtotal = 0;
    
    // 计算每行的总价
    for (let i = 1; i <= 21; i++) {
        const quantity = parseFloat(document.getElementById(`belt_quantity${i}`).value) || 0;
        const price = parseFloat(document.getElementById(`belt_price${i}`).value) || 0;
        const total = quantity * price;
        
        // 保留三位小数
        const formattedTotal = total.toFixed(3);
        document.getElementById(`belt_total${i}`).textContent = formattedTotal;
        
        subtotal += total;
    }
    
    // 显示小计
    const formattedSubtotal = subtotal.toFixed(3);
    document.getElementById('belt_subtotal').textContent = formattedSubtotal;
    
    // 计算最终报价
    const finalRate = parseFloat(document.getElementById('belt_finalRate').value) || 0;
    const finalTotal = subtotal * finalRate;
    const formattedFinalTotal = finalTotal.toFixed(3);
    document.getElementById('belt_finalTotal').textContent = formattedFinalTotal;
}

// 皮带输送机辅件计算功能
function calculateBeltAccessories() {
    // 获取输入值
    const conveyorLength = parseFloat(document.getElementById('belt_conveyorLength').value) || 0;
    const conveyorWidth = parseFloat(document.getElementById('belt_conveyorWidth').value) || 0;
    const plateDensity = parseFloat(document.getElementById('belt_plateDensity').value) || 7.85;
    const plateThickness = parseFloat(document.getElementById('belt_plateThickness').value) || 1.5;
    const plateCalcPrice = parseFloat(document.getElementById('belt_plateCalcPrice').value) || 10;
    const beltUnitPrice = parseFloat(document.getElementById('belt_beltUnitPrice').value) || 110;
    
    // 计算机架长度 = 皮带输送机的长度 × 2 ÷ 1000
    const frameLength = (conveyorLength * 2) / 1000;
    document.getElementById('belt_frameLength').value = frameLength.toFixed(3);
    
    // 计算支腿数量
    let legCount = 0;
    if (conveyorLength === 0 || isNaN(conveyorLength)) {
        legCount = 0; // 当长度为0或为空时，支腿数量为0
    } else if (conveyorLength < 350) {
        legCount = 1; // 当长度小于350mm时，支腿数量为1
    } else if (conveyorLength >= 350 && conveyorLength <= 2499.9999) {
        legCount = 2; // 当长度大于等于350mm且小于等于2499.9999mm时，支腿为2副
    } else if (conveyorLength >= 2500 && conveyorLength < 3000) {
        legCount = 3; // 当长度大于等于2500mm且小于3000mm时，支腿为3副
    } else if (conveyorLength >= 3000) {
        // 当长度大于等于3000mm时，支腿数量 = 皮带输送机长度 ÷ 1500 取整数 + 1
        legCount = Math.floor(conveyorLength / 1500) + 1;
    }
    document.getElementById('belt_legCount').value = legCount;
    
    // 计算护栏长度 = 皮带输送机的长度 × 2 ÷ 1000
    const railLength = (conveyorLength * 2) / 1000;
    document.getElementById('belt_railLength').value = railLength.toFixed(3);
    
    // 计算托板价格 = 皮带式输送机的长度 ÷ 1000 * (皮带式输送机的宽度+100) ÷ 1000 * 托板的计算系数 * 托板的计算厚度 * 托板的计算单价
    const platePrice = (conveyorLength / 1000) * ((conveyorWidth + 100) / 1000) * plateDensity * plateThickness * plateCalcPrice;
    document.getElementById('belt_platePrice').value = platePrice.toFixed(3);
    
    // 计算皮带价格 = (皮带输送机的长度 ÷ 1000+0.2) ×2×（皮带式输送机的宽度 ÷ 1000）×皮带的计算单价
    const beltPrice = ((conveyorLength / 1000) + 0.2) * 2 * (conveyorWidth / 1000) * beltUnitPrice;
    document.getElementById('belt_beltPrice').value = beltPrice.toFixed(3);
    
    // 计算张紧装置数量，当长度>=4000时为1，否则为0
    const tensionerCount = conveyorLength >= 4000 ? 1 : 0;
    document.getElementById('belt_tensionerCount').value = tensionerCount;
}

// 应用皮带输送机计算结果到报价表
function applyBeltToTable() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('belt_frameLength').value) || 0;
    const legCount = parseFloat(document.getElementById('belt_legCount').value) || 0;
    const platePrice = parseFloat(document.getElementById('belt_platePrice').value) || 0;
    const beltPrice = parseFloat(document.getElementById('belt_beltPrice').value) || 0;
    const railLength = parseFloat(document.getElementById('belt_railLength').value) || 0;
    const tensionerCount = parseFloat(document.getElementById('belt_tensionerCount').value) || 0;
    
    // 应用到报价表
    document.getElementById('belt_quantity1').value = frameLength.toFixed(3);  // 机架
    document.getElementById('belt_quantity2').value = legCount.toFixed(3);     // 支腿
    document.getElementById('belt_price3').value = platePrice.toFixed(3);      // 托板价格
    document.getElementById('belt_quantity5').value = tensionerCount.toFixed(3); // 张紧装置
    document.getElementById('belt_price9').value = beltPrice.toFixed(3);       // 皮带价格
    document.getElementById('belt_quantity10').value = railLength.toFixed(3);  // 护栏
    
    // 重新计算总价
    calculateBeltTotal();
}

// =================== 弯道机功能 ===================

// 计算弯道机总价功能
function calculateCurveTotal() {
    let subtotal = 0;
    
    // 计算每行的总价
    for (let i = 1; i <= 14; i++) {
        const quantity = parseFloat(document.getElementById(`curve_quantity${i}`).value) || 0;
        const price = parseFloat(document.getElementById(`curve_price${i}`).value) || 0;
        const total = quantity * price;
        
        // 保留三位小数
        const formattedTotal = total.toFixed(3);
        document.getElementById(`curve_total${i}`).textContent = formattedTotal;
        
        subtotal += total;
    }
    
    // 显示小计
    const formattedSubtotal = subtotal.toFixed(3);
    document.getElementById('curve_subtotal').textContent = formattedSubtotal;
    
    // 计算最终报价
    const finalRate = parseFloat(document.getElementById('curve_finalRate').value) || 0;
    const finalTotal = subtotal * finalRate;
    const formattedFinalTotal = finalTotal.toFixed(3);
    document.getElementById('curve_finalTotal').textContent = formattedFinalTotal;
}

// 弯道机辅件计算功能1
function calculateCurveAccessories1() {
    // 获取输入值
    const innerRadius = parseFloat(document.getElementById('curve_innerRadius').value) || 0;
    const effectiveWidth = parseFloat(document.getElementById('curve_effectiveWidth').value) || 0;
    
    if (innerRadius && effectiveWidth) {
        // 内长计算方式：90°内R编辑框的数值*2*3.14÷4÷1000
        const innerLength = innerRadius * 2 * Math.PI / 4 / 1000;
        
        // 外长计算方式：（90°内R编辑框的数值+有效宽编辑框的数值+70+80）*2*3.14÷4÷1000
        const outerLength = (innerRadius + effectiveWidth + 70 + 80) * 2 * Math.PI / 4 / 1000;
        
        // 需要的机架长度= 内长+外长
        const frameLength = innerLength + outerLength;
        document.getElementById('curve_frameLength1').value = frameLength.toFixed(3);
        
        // 90°弯道机 需要的辊筒数量固定为21支
        const rollerCount = 21;
        document.getElementById('curve_rollerCount1').value = rollerCount;
        
        // 需要的支腿数量固定为3
        const legCount = 3;
        document.getElementById('curve_legCount1').value = legCount;
        
        // 需要的链条长度=外长*4
        const chainLength = outerLength * 4;
        document.getElementById('curve_chainLength1').value = chainLength.toFixed(3);
        
        // 需要链罩的长度=外长
        const chainCoverLength = outerLength;
        document.getElementById('curve_chainCoverLength1').value = chainCoverLength.toFixed(3);
        
        // 需要的护栏长度=内长+外长
        const railLength = innerLength + outerLength;
        document.getElementById('curve_railLength1').value = railLength.toFixed(3);
    }
}

// 弯道机辅件计算功能2
function calculateCurveAccessories2() {
    // 获取输入值
    const innerRadius = parseFloat(document.getElementById('curve_innerRadius2').value) || 0;
    const effectiveWidth = parseFloat(document.getElementById('curve_effectiveWidth2').value) || 0;
    
    if (innerRadius && effectiveWidth) {
        // 内长计算方式：60°内R编辑框的数值*2*3.14÷6÷1000
        const innerLength = innerRadius * 2 * Math.PI / 6 / 1000;
        
        // 外长计算方式：（60°内R编辑框的数值+有效宽编辑框的数值+70+80）*2*3.14÷6÷1000
        const outerLength = (innerRadius + effectiveWidth + 70 + 80) * 2 * Math.PI / 6 / 1000;
        
        // 需要的机架长度= 内长+外长
        const frameLength = innerLength + outerLength;
        document.getElementById('curve_frameLength2').value = frameLength.toFixed(3);
        
        // 60°弯道机 需要的辊筒数量固定为14支（根据角度比例计算）
        const rollerCount = 14;
        document.getElementById('curve_rollerCount2').value = rollerCount;
        
        // 需要的支腿数量固定为2
        const legCount = 2;
        document.getElementById('curve_legCount2').value = legCount;
        
        // 需要的链条长度=外长*4
        const chainLength = outerLength * 4;
        document.getElementById('curve_chainLength2').value = chainLength.toFixed(3);
        
        // 需要链罩的长度=外长
        const chainCoverLength = outerLength;
        document.getElementById('curve_chainCoverLength2').value = chainCoverLength.toFixed(3);
        
        // 需要的护栏长度=内长+外长
        const railLength = innerLength + outerLength;
        document.getElementById('curve_railLength2').value = railLength.toFixed(3);
    }
}

// 弯道机辅件计算功能3
function calculateCurveAccessories3() {
    // 获取输入值
    const innerRadius = parseFloat(document.getElementById('curve_innerRadius3').value) || 0;
    const effectiveWidth = parseFloat(document.getElementById('curve_effectiveWidth3').value) || 0;
    
    if (innerRadius && effectiveWidth) {
        // 内长计算方式：30°内R编辑框的数值*2*3.14÷12÷1000
        const innerLength = innerRadius * 2 * Math.PI / 12 / 1000;
        
        // 外长计算方式：（30°内R编辑框的数值+有效宽编辑框的数值+70+80）*2*3.14÷12÷1000
        const outerLength = (innerRadius + effectiveWidth + 70 + 80) * 2 * Math.PI / 12 / 1000;
        
        // 需要的机架长度= 内长+外长
        const frameLength = innerLength + outerLength;
        document.getElementById('curve_frameLength3').value = frameLength.toFixed(3);
        
        // 30°弯道机 需要的辊筒数量固定为7支（根据角度比例计算）
        const rollerCount = 7;
        document.getElementById('curve_rollerCount3').value = rollerCount;
        
        // 需要的支腿数量固定为2
        const legCount = 2;
        document.getElementById('curve_legCount3').value = legCount;
        
        // 需要的链条长度=外长*4
        const chainLength = outerLength * 4;
        document.getElementById('curve_chainLength3').value = chainLength.toFixed(3);
        
        // 需要链罩的长度=外长
        const chainCoverLength = outerLength;
        document.getElementById('curve_chainCoverLength3').value = chainCoverLength.toFixed(3);
        
        // 需要的护栏长度=内长+外长
        const railLength = innerLength + outerLength;
        document.getElementById('curve_railLength3').value = railLength.toFixed(3);
    }
}

// 应用弯道机计算结果到报价表（第一个辅件计算器）
function applyCurveToTable1() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('curve_frameLength1').value) || 0;
    const rollerCount = parseFloat(document.getElementById('curve_rollerCount1').value) || 0;
    const legCount = parseFloat(document.getElementById('curve_legCount1').value) || 0;
    const chainLength = parseFloat(document.getElementById('curve_chainLength1').value) || 0;
    const chainCoverLength = parseFloat(document.getElementById('curve_chainCoverLength1').value) || 0;
    const railLength = parseFloat(document.getElementById('curve_railLength1').value) || 0;
    
    // 应用到报价表
    document.getElementById('curve_quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('curve_quantity2').value = rollerCount.toFixed(3); // 辊筒数量
    document.getElementById('curve_quantity3').value = legCount.toFixed(3);    // 支腿
    document.getElementById('curve_quantity4').value = chainCoverLength.toFixed(3); // 链罩
    document.getElementById('curve_quantity6').value = railLength.toFixed(3);    // 护栏
    document.getElementById('curve_quantity8').value = chainLength.toFixed(3); // 链条
    
    // 重新计算总价
    calculateCurveTotal();
}

// 应用弯道机计算结果到报价表（第二个辅件计算器）
function applyCurveToTable2() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('curve_frameLength2').value) || 0;
    const rollerCount = parseFloat(document.getElementById('curve_rollerCount2').value) || 0;
    const legCount = parseFloat(document.getElementById('curve_legCount2').value) || 0;
    const chainLength = parseFloat(document.getElementById('curve_chainLength2').value) || 0;
    const chainCoverLength = parseFloat(document.getElementById('curve_chainCoverLength2').value) || 0;
    const railLength = parseFloat(document.getElementById('curve_railLength2').value) || 0;
    
    // 应用到报价表
    document.getElementById('curve_quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('curve_quantity2').value = rollerCount.toFixed(3); // 辊筒数量
    document.getElementById('curve_quantity3').value = legCount.toFixed(3);    // 支腿
    document.getElementById('curve_quantity4').value = chainCoverLength.toFixed(3); // 链罩
    document.getElementById('curve_quantity6').value = railLength.toFixed(3);    // 护栏
    document.getElementById('curve_quantity8').value = chainLength.toFixed(3); // 链条
    
    // 重新计算总价
    calculateCurveTotal();
}

// 应用弯道机计算结果到报价表（第三个辅件计算器）
function applyCurveToTable3() {
    // 获取计算结果
    const frameLength = parseFloat(document.getElementById('curve_frameLength3').value) || 0;
    const rollerCount = parseFloat(document.getElementById('curve_rollerCount3').value) || 0;
    const legCount = parseFloat(document.getElementById('curve_legCount3').value) || 0;
    const chainLength = parseFloat(document.getElementById('curve_chainLength3').value) || 0;
    const chainCoverLength = parseFloat(document.getElementById('curve_chainCoverLength3').value) || 0;
    const railLength = parseFloat(document.getElementById('curve_railLength3').value) || 0;
    
    // 应用到报价表
    document.getElementById('curve_quantity1').value = frameLength.toFixed(3); // 机架
    document.getElementById('curve_quantity2').value = rollerCount.toFixed(3); // 辊筒数量
    document.getElementById('curve_quantity3').value = legCount.toFixed(3);    // 支腿
    document.getElementById('curve_quantity4').value = chainCoverLength.toFixed(3); // 链罩
    document.getElementById('curve_quantity6').value = railLength.toFixed(3);    // 护栏
    document.getElementById('curve_quantity8').value = chainLength.toFixed(3); // 链条
    
    // 重新计算总价
    calculateCurveTotal();
}

// =================== 链条机功能 ===================

// 计算链条机相关数据功能
function calculateChainAccessories() {
    // 获取输入值
    const chainLength = parseFloat(document.getElementById('chain_length').value) || 0;
    const isDoubleChain = document.getElementById('chain_double').checked;
    const addPlate = document.getElementById('chain_addPlate').checked;
    const chainWidth = parseFloat(document.getElementById('chain_width').value) || 0;
    const plateThickness = parseFloat(document.getElementById('chain_plateThickness').value) || 1.5;
    const plateDensity = parseFloat(document.getElementById('chain_plateDensity').value) || 7.85;
    const platePrice = parseFloat(document.getElementById('chain_platePrice').value) || 10.00;
    
    // 获取价格输入框元素
    const frameInput = document.getElementById('chain_framePrice');
    const driveFrameInput = document.getElementById('chain_driveFramePrice');
    
    // 检查是否是首次加载或切换了链条类型
    // 注意：只有在输入框为空或未被用户手动修改或刚切换链条类型时才应用默认值
    if (frameInput.value === "" || driveFrameInput.value === "" || 
        (frameInput.dataset.chainType !== undefined && frameInput.dataset.chainType !== (isDoubleChain ? "double" : "triple"))) {
        
        // 更新当前链条类型标记
        frameInput.dataset.chainType = isDoubleChain ? "double" : "triple";
        driveFrameInput.dataset.chainType = isDoubleChain ? "double" : "triple";
        
        // 如果是切换链条类型或价格未被手动修改，则应用默认值
        if (frameInput.dataset.manuallyEdited !== "true") {
            if (isDoubleChain) {
                // 双排链条机的单价设置
                frameInput.value = "550.00";
            } else {
                // 三排链条机的单价设置
                frameInput.value = "750.00";
            }
        }
        
        if (driveFrameInput.dataset.manuallyEdited !== "true") {
            if (isDoubleChain) {
                // 双排链条机的驱动架单价设置
                driveFrameInput.value = "1200.00";
            } else {
                // 三排链条机的驱动架单价设置
                driveFrameInput.value = "1500.00";
            }
        }
    }
    
    // 获取当前价格值
    let framePrice = parseFloat(frameInput.value) || 0;
    let driveFramePrice = parseFloat(driveFrameInput.value) || 0;
    
    const legPrice = parseFloat(document.getElementById('chain_legPrice').value) || 0;
    const profitRate = parseFloat(document.getElementById('chain_profitRate').value) || 1.32;
    
    // 获取当前支腿数量值
    let legCount = parseFloat(document.getElementById('chain_legCount').value) || 0;
    const legCountInput = document.getElementById('chain_legCount');
    
    // 仅当输入框为空或未手动修改时自动计算支腿数量
    if (legCountInput.value === "" || legCountInput.dataset.autoCalculated === "true") {
        if (chainLength === 0 || isNaN(chainLength)) {
            legCount = 0; // 当长度为0或为空时，支腿数量为0
        } else if (chainLength < 350) {
            legCount = 1; // 当长度小于350mm时，支腿数量为1
        } else if (chainLength >= 350 && chainLength <= 2499.9999) {
            legCount = 2; // 当长度大于等于350mm且小于等于2499.9999mm时，支腿为2副
        } else if (chainLength >= 2500 && chainLength < 3000) {
            legCount = 3; // 当长度大于等于2500mm且小于3000mm时，支腿为3副
        } else if (chainLength >= 3000) {
            // 当长度大于等于3000mm时，支腿数量 = 链条机长度 ÷ 1500 取整数 + 1
            legCount = Math.floor(chainLength / 1500) + 1;
        }
        legCountInput.value = legCount;
        legCountInput.dataset.autoCalculated = "true";
    }
    
    // 计算板材成本价格 = 链条机长度*链条机宽度*板材密度*封板厚度*板材价格+链条机长度*链条机宽度*2*24
    let plateCostPrice = 0;
    if (chainLength > 0 && chainWidth > 0) {
        plateCostPrice = (chainLength * chainWidth * plateDensity * plateThickness * platePrice / 1000000) + 
                         (chainLength * chainWidth * 2 * 24 / 1000000);
    }
    document.getElementById('chain_plateCostPrice').value = plateCostPrice.toFixed(2);
    
    // 计算成本价格
    let costPrice = 0;
    if (addPlate) {
        // 当选择框被勾选时：成本价格 = 链条机长度(mm) × 机架单价 ÷ 1000 + 驱动架单价 + 支腿数量 × 支腿单价 + 板材成本价格
        costPrice = (chainLength * framePrice / 1000) + driveFramePrice + (legCount * legPrice) + plateCostPrice;
    } else {
        // 当选择框未勾选时：成本价格 = 链条机长度(mm) × 机架单价 ÷ 1000 + 驱动架单价 + 支腿数量 × 支腿单价
        costPrice = (chainLength * framePrice / 1000) + driveFramePrice + (legCount * legPrice);
    }
    document.getElementById('chain_costPrice').value = costPrice.toFixed(2);
    
    // 计算最终报价 = 成本价格 × 利润率
    const finalPrice = costPrice * profitRate;
    document.getElementById('chain_finalPrice').value = finalPrice.toFixed(2);
}

// 页面加载完成后，初始化计算
document.addEventListener('DOMContentLoaded', function() {
    calculateTotal();
    
    // 初始化辅件计算
    calculateAccessories();
    
    // 监听辅件计算输入变化
    document.getElementById('rollerLength').addEventListener('input', calculateAccessories);
    document.getElementById('rollerSpacing').addEventListener('input', calculateAccessories);
    
    // 添加多楔带辊道机的初始化
    calculateVBeltTotal();
    calculateVBeltAccessories();
    
    // 监听多楔带辊道机辅件计算输入变化
    document.getElementById('vbelt_rollerLength').addEventListener('input', calculateVBeltAccessories);
    document.getElementById('vbelt_rollerSpacing').addEventListener('input', calculateVBeltAccessories);
    document.getElementById('vbelt_beltCount').addEventListener('input', calculateVBeltAccessories);
    
    // 添加数字输入框的焦点事件，自动选中全部内容
    const inputs = document.querySelectorAll('input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function() {
            this.select();
        });
    }
    
    // 防止移动设备上输入数字时页面缩放
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
            e.target.addEventListener('focus', function() {
                document.documentElement.style.touchAction = 'none';
            });
            
            e.target.addEventListener('blur', function() {
                document.documentElement.style.touchAction = 'auto';
            });
        }
    });
    
    // 初始化双链辊道机计算
    calculateDChainTotal();
    calculateDChainAccessories();
    
    // 监听双链辊道机辅件计算输入变化
    document.getElementById('dchain_rollerLength').addEventListener('input', calculateDChainAccessories);
    document.getElementById('dchain_rollerSpacing').addEventListener('input', calculateDChainAccessories);
    
    // 初始化皮带输送机计算
    calculateBeltTotal();
    calculateBeltAccessories();
    
    // 监听皮带输送机辅件计算输入变化
    document.getElementById('belt_conveyorLength').addEventListener('input', calculateBeltAccessories);
    document.getElementById('belt_conveyorWidth').addEventListener('input', calculateBeltAccessories);
    document.getElementById('belt_plateDensity').addEventListener('input', calculateBeltAccessories);
    document.getElementById('belt_plateThickness').addEventListener('input', calculateBeltAccessories);
    document.getElementById('belt_plateCalcPrice').addEventListener('input', calculateBeltAccessories);
    document.getElementById('belt_beltUnitPrice').addEventListener('input', calculateBeltAccessories);
    
    // 初始化弯道机计算
    calculateCurveTotal();
    
    // 监听弯道机辅件计算输入变化
    document.getElementById('curve_innerRadius').addEventListener('input', calculateCurveAccessories1);
    document.getElementById('curve_effectiveWidth').addEventListener('input', calculateCurveAccessories1);
    
    document.getElementById('curve_innerRadius2').addEventListener('input', calculateCurveAccessories2);
    document.getElementById('curve_effectiveWidth2').addEventListener('input', calculateCurveAccessories2);
    
    document.getElementById('curve_innerRadius3').addEventListener('input', calculateCurveAccessories3);
    document.getElementById('curve_effectiveWidth3').addEventListener('input', calculateCurveAccessories3);
    
    // 初始化链条机计算 - 确保页面加载时执行一次计算以设置默认值
    document.getElementById('chain_double').checked = true; // 默认选择双排链条机
    calculateChainAccessories();
    
    // 监听链条机计算输入变化
    document.getElementById('chain_length').addEventListener('input', calculateChainAccessories);
    document.getElementById('chain_legPrice').addEventListener('input', calculateChainAccessories);
    document.getElementById('chain_profitRate').addEventListener('input', calculateChainAccessories);
    
    // 当选择不同类型的链条机时，重置价格输入框的手动修改标记
    document.getElementById('chain_double').addEventListener('change', function() {
        if(this.checked) {
            // 取消手动修改标记，以便应用默认值
            document.getElementById('chain_framePrice').dataset.manuallyEdited = "false";
            document.getElementById('chain_driveFramePrice').dataset.manuallyEdited = "false";
        }
        calculateChainAccessories();
    });
    
    document.getElementById('chain_triple').addEventListener('change', function() {
        if(this.checked) {
            // 取消手动修改标记，以便应用默认值
            document.getElementById('chain_framePrice').dataset.manuallyEdited = "false";
            document.getElementById('chain_driveFramePrice').dataset.manuallyEdited = "false";
        }
        calculateChainAccessories();
    });
    
    document.getElementById('chain_addPlate').addEventListener('change', calculateChainAccessories);
    document.getElementById('chain_width').addEventListener('input', calculateChainAccessories);
    document.getElementById('chain_plateThickness').addEventListener('input', calculateChainAccessories);
    document.getElementById('chain_plateDensity').addEventListener('input', calculateChainAccessories);
    document.getElementById('chain_platePrice').addEventListener('input', calculateChainAccessories);
    
    // 添加机架单价和驱动架单价输入框的事件监听器，标记为手动修改
    document.getElementById('chain_framePrice').addEventListener('input', function() {
        this.dataset.manuallyEdited = "true"; // 标记为手动修改
        calculateChainAccessories();
    });
    
    document.getElementById('chain_driveFramePrice').addEventListener('input', function() {
        this.dataset.manuallyEdited = "true"; // 标记为手动修改
        calculateChainAccessories();
    });
    
    // 添加支腿数量输入框的事件监听器，标记为手动修改
    document.getElementById('chain_legCount').addEventListener('input', function() {
        this.dataset.autoCalculated = "false"; // 标记为手动修改
        calculateChainAccessories();
    });
    
    // 当链条长度变化时，重置支腿数量的自动计算标记
    document.getElementById('chain_length').addEventListener('input', function() {
        document.getElementById('chain_legCount').dataset.autoCalculated = "true"; // 重置为自动计算
        calculateChainAccessories();
    });
}); 