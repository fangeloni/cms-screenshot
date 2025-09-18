(function() {
    // --- FUNZIONI ORIGINALI MODIFICATE ---
    function aggiornaCampoGiochiFlaggati() {
        const checkboxes = document.querySelectorAll('#m_c_customTableForm_customTableForm_Thumbnails_list input[type="checkbox"]');
        const giochiFlaggati = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const checkboxId = checkbox.getAttribute('id');
                const label = document.querySelector(`label[for="${checkboxId}"]`);
                if (label) {
                    giochiFlaggati.push(label.textContent.trim());
                }
            }
        });
        const originalThumbnailsField = document.getElementById('field_Thumbnails');
        if (originalThumbnailsField) {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');
            formGroup.id = 'formGroupThumbnailsFlaggate';
            formGroup.style.marginTop = '10px';
            const labelCell = document.createElement('div');
            labelCell.classList.add('editing-form-label-cell');
            const labelNuovoCampo = document.createElement('label');
            labelNuovoCampo.textContent = 'Thumbnails Flaggate:';
            labelNuovoCampo.classList.add('control-label', 'editing-form-label');
            labelCell.appendChild(labelNuovoCampo);
            formGroup.appendChild(labelCell);
            const valueCell = document.createElement('div');
            valueCell.classList.add('editing-form-value-cell');
            const flaggedItemsContainer = document.createElement('div');
            flaggedItemsContainer.style.marginTop = '6px';
            giochiFlaggati.forEach(gioco => {
                const fakeCheckbox = document.createElement('span');
                fakeCheckbox.style.display = 'inline-flex';
                fakeCheckbox.style.justifyContent = 'center';
                fakeCheckbox.style.alignItems = 'center';
                fakeCheckbox.style.width = '12px';
                fakeCheckbox.style.height = '12px';
                fakeCheckbox.style.border = '1px solid #888';
                fakeCheckbox.style.backgroundColor = '#eee';
                fakeCheckbox.style.marginRight = '5px';
                fakeCheckbox.style.verticalAlign = 'middle';
                const checkMark = document.createElement('span');
                checkMark.innerHTML = '&#10004;';
                checkMark.style.color = 'green';
                checkMark.style.fontSize = '10px';
                checkMark.style.fontWeight = 'bold';
                fakeCheckbox.appendChild(checkMark);
                const labelGioco = document.createElement('span');
                labelGioco.textContent = gioco;
                labelGioco.style.fontWeight = 'bold';
                labelGioco.style.marginRight = '10px';
                labelGioco.style.verticalAlign = 'middle';
                flaggedItemsContainer.appendChild(fakeCheckbox);
                flaggedItemsContainer.appendChild(labelGioco);
            });
            valueCell.appendChild(flaggedItemsContainer);
            formGroup.appendChild(valueCell);
            originalThumbnailsField.parentNode.insertBefore(formGroup, originalThumbnailsField.nextSibling);
            originalThumbnailsField.style.display = 'none';
        }
    }

    function aggiornaCampoCategorieFlaggate() {
        const checkboxes = document.querySelectorAll('#m_c_customTableForm_customTableForm_Categories_list input[type="checkbox"]');
        const categorieFlaggate = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const checkboxId = checkbox.getAttribute('id');
                const label = document.querySelector(`label[for="${checkboxId}"]`);
                if (label) {
                    categorieFlaggate.push(label.textContent.trim());
                }
            }
        });
        const originalCategoriesField = document.getElementById('field_Categories');
        if (originalCategoriesField) {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');
            formGroup.id = 'formGroupCategorieFlaggate';
            formGroup.style.marginTop = '10px';
            formGroup.style.display = 'none';
            const labelCell = document.createElement('div');
            labelCell.classList.add('editing-form-label-cell');
            const labelNuovoCampo = document.createElement('label');
            labelNuovoCampo.textContent = 'Categorie Flagate:';
            labelNuovoCampo.classList.add('control-label', 'editing-form-label');
            labelCell.appendChild(labelNuovoCampo);
            formGroup.appendChild(labelCell);
            const valueCell = document.createElement('div');
            valueCell.classList.add('editing-form-value-cell');
            const flaggedItemsContainer = document.createElement('div');
            flaggedItemsContainer.style.marginTop = '6px';
            categorieFlaggate.forEach(categoria => {
                const fakeCheckbox = document.createElement('span');
                fakeCheckbox.style.display = 'inline-flex';
                fakeCheckbox.style.justifyContent = 'center';
                fakeCheckbox.style.alignItems = 'center';
                fakeCheckbox.style.width = '12px';
                fakeCheckbox.style.height = '12px';
                fakeCheckbox.style.border = '1px solid #888';
                fakeCheckbox.style.backgroundColor = '#eee';
                fakeCheckbox.style.marginRight = '5px';
                fakeCheckbox.style.verticalAlign = 'middle';
                const checkMark = document.createElement('span');
                checkMark.innerHTML = '&#10004;';
                checkMark.style.color = 'green';
                checkMark.style.fontSize = '10px';
                checkMark.style.fontWeight = 'bold';
                fakeCheckbox.appendChild(checkMark);
                const labelCategoria = document.createElement('span');
                labelCategoria.textContent = categoria;
                labelCategoria.style.fontWeight = 'bold';
                labelCategoria.style.marginRight = '10px';
                labelCategoria.style.verticalAlign = 'middle';
                flaggedItemsContainer.appendChild(fakeCheckbox);
                flaggedItemsContainer.appendChild(labelCategoria);
            });
            valueCell.appendChild(flaggedItemsContainer);
            formGroup.appendChild(valueCell);
            originalCategoriesField.parentNode.insertBefore(formGroup, originalCategoriesField.nextSibling);
            originalCategoriesField.style.display = 'none';
        }
    }

    function createPreviewForClient() {
        const forcedHideFields = [
            'field_Channel','field_Label','field_PageTitle','field_GameInside','field_IsRegistrationPromo',
            'field_UrlImageOverview','field_UrlImageOverviewHome','field_UrlImageDetail','field_Timer',
            'field_PageDescription','field_DestinationUrl1','field_DestinationUrl2','field_Order'
        ];
        forcedHideFields.forEach(fieldId=>{
            const field=document.getElementById(fieldId);
            if(field){
                const formGroup=field.closest('.form-group');
                if(formGroup&&!formGroup.id.startsWith('formGroup')) formGroup.style.display='none';
            }
        });

        const createImagePreview=(fieldId,labelText)=>{
            const field=document.getElementById(fieldId);
            if(field){
                const inputElement=field.querySelector('input[type="text"]');
                const imageUrl=inputElement?inputElement.value.trim():'';
                const formGroup=field.closest('.form-group');
                if(imageUrl&&formGroup){
                    const previewContainer=document.createElement('div');
                    previewContainer.classList.add('form-group');
                    previewContainer.id=`preview_${fieldId}`;
                    previewContainer.style.marginTop='10px';
                    const labelCell=document.createElement('div');
                    labelCell.classList.add('editing-form-label-cell');
                    const labelNuovoCampo=document.createElement('label');
                    labelNuovoCampo.textContent=labelText+':';
                    labelNuovoCampo.classList.add('control-label','editing-form-label');
                    labelCell.appendChild(labelNuovoCampo);
                    previewContainer.appendChild(labelCell);
                    const valueCell=document.createElement('div');
                    valueCell.classList.add('editing-form-value-cell');
                    const imageElement=document.createElement('img');
                    imageElement.src=imageUrl;
                    imageElement.style.display='block';
                    imageElement.style.maxHeight='200px';
                    imageElement.style.height='auto';
                    valueCell.appendChild(imageElement);
                    previewContainer.appendChild(valueCell);
                    formGroup.parentNode.insertBefore(previewContainer,formGroup.nextSibling);
                    formGroup.style.display='none';
                }
            }
        };

        createImagePreview('field_UrlImageOverview','Anteprima Immagine Overview');
        createImagePreview('field_UrlImageOverviewHome','Anteprima Immagine Home');
        createImagePreview('field_UrlImageDetail','Anteprima Immagine Dettaglio');

        // Pulsante chiudi anteprima
        if(!document.getElementById('closePreviewBtn')){
            const btn=document.createElement('button');
            btn.id='closePreviewBtn';
            btn.textContent='Chiudi Anteprima';
            btn.style.position='fixed';
            btn.style.top='10px';
            btn.style.right='10px';
            btn.style.zIndex='999999';
            btn.onclick=()=>{document.querySelectorAll('[id^="preview_"]').forEach(el=>el.remove()); btn.remove();};
            document.body.appendChild(btn);
        }
    }

    function adjustSpecificInputWidths() {
        const inputs=[
            'm_c_customTableForm_customTableForm_DescriptionOverview_txtText',
            'm_c_customTableForm_customTableForm_LinkButton1_txtText',
            'm_c_customTableForm_customTableForm_LinkButton2_txtText'
        ];
        inputs.forEach(id=>{
            const input=document.getElementById(id);
            if(input){
                const minWidth=320;
                const padding=20;
                const tempSpan=document.createElement('span');
                tempSpan.style.visibility='hidden';
                tempSpan.style.whiteSpace='pre';
                tempSpan.style.font=window.getComputedStyle(input).font;
                tempSpan.textContent=input.value||input.placeholder||'';
                document.body.appendChild(tempSpan);
                const width=Math.max(tempSpan.offsetWidth+padding,minWidth);
                input.style.width=width+'px';
                input.style.maxWidth='none';
                document.body.removeChild(tempSpan);
                input.addEventListener('input',()=>{
                    tempSpan.textContent=input.value||input.placeholder||'';
                    input.style.width=Math.max(tempSpan.offsetWidth+padding,minWidth)+'px';
                    input.style.maxWidth='none';
                });
            }
        });
    }

    function waitForExternalImages() {
        return new Promise(resolve=>{
            const images=document.querySelectorAll('#preview_field_UrlImageOverview img,#preview_field_UrlImageOverviewHome img,#preview_field_UrlImageDetail img');
            const numImages=images.length;
            let imagesLoaded=0;
            if(numImages===0){resolve();return;}
            images.forEach(img=>{
                img.onload=img.onerror=()=>{imagesLoaded++;if(imagesLoaded===numImages) resolve();};
                if(img.complete){imagesLoaded++;if(imagesLoaded===numImages) resolve();}
            });
        });
    }

    async function prepareForScreenshot() {
        aggiornaCampoGiochiFlaggati();
        aggiornaCampoCategorieFlaggate();
        createPreviewForClient();
        adjustSpecificInputWidths();
        await waitForExternalImages();

        // Screenshot automatico
        if(html2canvas){
            html2canvas(document.body).then(canvas=>{
                const link=document.createElement('a');
                link.download='anteprima_cms.png';
                link.href=canvas.toDataURL();
                link.click();
            });
        } else {
            console.warn('html2canvas non trovato. Aggiungi la libreria per fare il download automatico.');
        }
    }

    // Esegui tutto
    prepareForScreenshot();
})();
