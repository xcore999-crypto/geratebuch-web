from pathlib import Path
from typing import Callable

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_ROW_HEIGHT_RULE, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "dokumente"
OUTPUT.mkdir(parents=True, exist_ok=True)

# compact_reference_guide preset + named override `a4_operational_forms`:
# A4 portrait, 0.65 in margins, and full-width tables scaled to 10032 DXA.
PAGE_WIDTH_DXA = 11904
MARGIN_DXA = 936
TABLE_WIDTH_DXA = PAGE_WIDTH_DXA - (2 * MARGIN_DXA)
TABLE_INDENT_DXA = 120
CELL_MARGINS = {"top": 80, "bottom": 80, "start": 120, "end": 120}

NAVY = "0B2545"
BLUE = "2650D9"
BLUE_DARK = "1F4D78"
BLUE_FILL = "E8EEF5"
LIGHT_FILL = "F4F6F9"
GRAY_FILL = "F2F4F7"
MUTED = "667085"
BORDER = "CBD5E1"
WHITE = "FFFFFF"
AMBER_FILL = "FFF8E8"
AMBER = "7A5A00"


def set_cell_margins(cell, **kwargs):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for edge in ("top", "start", "bottom", "end"):
        element = tc_mar.find(qn(f"w:{edge}"))
        if element is None:
            element = OxmlElement(f"w:{edge}")
            tc_mar.append(element)
        element.set(qn("w:w"), str(kwargs.get(edge, CELL_MARGINS[edge])))
        element.set(qn("w:type"), "dxa")


def shade(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_width(cell, width_dxa):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(width_dxa))
    tc_w.set(qn("w:type"), "dxa")


def set_table_geometry(table, widths):
    assert sum(widths) == TABLE_WIDTH_DXA, (sum(widths), TABLE_WIDTH_DXA)
    table.autofit = False
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_pr = table._tbl.tblPr
    tbl_w = tbl_pr.find(qn("w:tblW"))
    if tbl_w is None:
        tbl_w = OxmlElement("w:tblW")
        tbl_pr.append(tbl_w)
    tbl_w.set(qn("w:w"), str(TABLE_WIDTH_DXA))
    tbl_w.set(qn("w:type"), "dxa")
    tbl_ind = tbl_pr.find(qn("w:tblInd"))
    if tbl_ind is None:
        tbl_ind = OxmlElement("w:tblInd")
        tbl_pr.append(tbl_ind)
    tbl_ind.set(qn("w:w"), str(TABLE_INDENT_DXA))
    tbl_ind.set(qn("w:type"), "dxa")
    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in widths:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(width))
        grid.append(col)
    for row in table.rows:
        for index, cell in enumerate(row.cells):
            set_cell_width(cell, widths[min(index, len(widths) - 1)])
            set_cell_margins(cell)


def set_cell_border(cell, color=BORDER, size="6"):
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.find(qn("w:tcBorders"))
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        tag = qn(f"w:{edge}")
        el = borders.find(tag)
        if el is None:
            el = OxmlElement(f"w:{edge}")
            borders.append(el)
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), size)
        el.set(qn("w:color"), color)


def set_run(run, size=10, color=NAVY, bold=False, italic=False):
    run.font.name = "Calibri"
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), "Calibri")
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), "Calibri")
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    run.bold = bold
    run.italic = italic
    return run


def configure_styles(doc):
    section = doc.sections[0]
    section.page_width = Inches(8.2667)
    section.page_height = Inches(11.6929)
    section.top_margin = Inches(0.65)
    section.bottom_margin = Inches(0.65)
    section.left_margin = Inches(0.65)
    section.right_margin = Inches(0.65)
    section.header_distance = Inches(0.35)
    section.footer_distance = Inches(0.35)

    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
    normal.font.size = Pt(11)
    normal.font.color.rgb = RGBColor.from_string(NAVY)
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.25

    for name, size, color, before, after in [
        ("Heading 1", 16, "2E74B5", 18, 10),
        ("Heading 2", 13, "2E74B5", 14, 7),
        ("Heading 3", 12, "1F4D78", 10, 5),
    ]:
        style = doc.styles[name]
        style.font.name = "Calibri"
        style._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
        style._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
        style.font.size = Pt(size)
        style.font.color.rgb = RGBColor.from_string(color)
        style.font.bold = True
        style.paragraph_format.space_before = Pt(before)
        style.paragraph_format.space_after = Pt(after)
        style.paragraph_format.keep_with_next = True

    doc.core_properties.author = "geratebuch.de"
    doc.core_properties.company = "EuroIPL"
    doc.core_properties.comments = "Kostenlose Praxisvorlage; vor Verwendung individuell prüfen und anpassen."


def paragraph_rule(paragraph, color=BORDER, val="single", size="6", space="1"):
    p_pr = paragraph._p.get_or_add_pPr()
    borders = p_pr.find(qn("w:pBdr"))
    if borders is None:
        borders = OxmlElement("w:pBdr")
        p_pr.append(borders)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), val)
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), space)
    bottom.set(qn("w:color"), color)
    borders.append(bottom)


def set_header_footer(doc, short_title):
    section = doc.sections[0]
    header = section.header
    p = header.paragraphs[0]
    p.paragraph_format.space_after = Pt(4)
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_run(p.add_run("GERATEBUCH.DE"), 8.5, BLUE, True)
    set_run(p.add_run(f"  |  {short_title}"), 8.5, MUTED)
    paragraph_rule(p, "D7DBE2", size="4")

    footer = section.footer
    p = footer.paragraphs[0]
    p.paragraph_format.space_before = Pt(4)
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    set_run(p.add_run("Kostenlose Arbeitshilfe · geratebuch.de   |   Seite "), 8, MUTED)
    fld = OxmlElement("w:fldSimple")
    fld.set(qn("w:instr"), "PAGE")
    p._p.append(fld)


def add_title(doc, title, subtitle, code):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(1)
    set_run(p.add_run("KOSTENLOSE PRAXISVORLAGE"), 8.5, BLUE, True)
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    set_run(p.add_run(title), 23, NAVY, True)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(10)
    set_run(p.add_run(subtitle), 10.5, MUTED)
    table = doc.add_table(rows=1, cols=2)
    set_table_geometry(table, [5016, 5016])
    for cell in table.rows[0].cells:
        shade(cell, LIGHT_FILL)
        set_cell_border(cell, "E2E8F0", "4")
    cell_text(table.cell(0, 0), "STUDIO / BETRIEB", "")
    cell_text(table.cell(0, 1), "VORLAGEN-ID / STAND", f"{code}  ·  08/2026")
    space(doc, 6)


def add_continuation_title(doc, title, page_label):
    doc.add_page_break()
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(2)
    set_run(p.add_run(title), 18, NAVY, True)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(8)
    set_run(p.add_run(page_label), 9, MUTED, True)


def space(doc, points=5):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(points)


def section_heading(doc, text):
    p = doc.add_paragraph(style="Heading 2")
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(5)
    p.add_run(text)


def cell_text(cell, label, value="", fill=None, size=9.5):
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.TOP
    if fill:
        shade(cell, fill)
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    set_run(p.add_run(label), 7.5, MUTED, True)
    if value:
        p2 = cell.add_paragraph()
        p2.paragraph_format.space_after = Pt(0)
        set_run(p2.add_run(value), size, NAVY)
    else:
        p2 = cell.add_paragraph()
        p2.paragraph_format.space_after = Pt(8)
        set_run(p2.add_run(" "), size, NAVY)


def field_grid(doc, rows, cols=2):
    widths = [TABLE_WIDTH_DXA // cols] * cols
    widths[-1] += TABLE_WIDTH_DXA - sum(widths)
    table = doc.add_table(rows=len(rows), cols=cols)
    set_table_geometry(table, widths)
    for row_i, row_data in enumerate(rows):
        row = table.rows[row_i]
        row.height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
        row.height = Inches(0.42)
        for col_i, cell in enumerate(row.cells):
            set_cell_border(cell)
            if col_i < len(row_data):
                item = row_data[col_i]
                if isinstance(item, tuple):
                    cell_text(cell, item[0], item[1])
                else:
                    cell_text(cell, item)
            else:
                cell_text(cell, "")
    return table


def checklist(doc, items, columns=2, title=None):
    if title:
        section_heading(doc, title)
    rows = (len(items) + columns - 1) // columns
    widths = [TABLE_WIDTH_DXA // columns] * columns
    widths[-1] += TABLE_WIDTH_DXA - sum(widths)
    table = doc.add_table(rows=rows, cols=columns)
    set_table_geometry(table, widths)
    for i, cell in enumerate([cell for row in table.rows for cell in row.cells]):
        set_cell_border(cell, "E2E8F0", "4")
        cell.text = ""
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        if i < len(items):
            set_run(p.add_run(f"☐ {items[i]}"), 9.2, NAVY)
    return table


def log_table(doc, headers, widths, empty_rows=5, font_size=8.5):
    table = doc.add_table(rows=empty_rows + 1, cols=len(headers))
    set_table_geometry(table, widths)
    for cell, text in zip(table.rows[0].cells, headers):
        shade(cell, BLUE_FILL)
        set_cell_border(cell)
        cell.text = ""
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        set_run(p.add_run(text), 7.5, BLUE_DARK, True)
    for row in table.rows[1:]:
        row.height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
        row.height = Inches(0.42)
        for cell in row.cells:
            set_cell_border(cell)
            cell.text = ""
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            set_run(p.add_run(" "), font_size, NAVY)
    return table


def note_box(doc, text, caution=False):
    table = doc.add_table(rows=1, cols=1)
    set_table_geometry(table, [TABLE_WIDTH_DXA])
    cell = table.cell(0, 0)
    shade(cell, AMBER_FILL if caution else LIGHT_FILL)
    set_cell_border(cell, "E9D79B" if caution else "D7DBE2", "4")
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    set_run(p.add_run(text), 8.5, AMBER if caution else MUTED, caution)


def signatures(doc, left="Ort, Datum / Kundin oder Kunde", right="Behandelnde Person"):
    space(doc, 12)
    table = doc.add_table(rows=1, cols=2)
    set_table_geometry(table, [5016, 5016])
    for cell, label in zip(table.rows[0].cells, [left, right]):
        cell.text = ""
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        set_run(p.add_run("________________________________________"), 9, MUTED)
        p2 = cell.add_paragraph()
        p2.paragraph_format.space_after = Pt(0)
        set_run(p2.add_run(label), 7.5, MUTED)


def final_disclaimer(doc, text="Muster ohne Gewähr. Vor Verwendung an Studio, Behandlung, Gerät und aktuelle rechtliche Vorgaben anpassen."):
    space(doc, 5)
    note_box(doc, text, caution=True)


def make_document(title, subtitle, code, builder: Callable[[Document], None]):
    doc = Document()
    configure_styles(doc)
    set_header_footer(doc, title)
    add_title(doc, title, subtitle, code)
    builder(doc)
    path = OUTPUT / f"{code}.docx"
    doc.save(path)
    return path


def build_anamnesis(doc):
    section_heading(doc, "1. Person & Kontakt")
    field_grid(doc, [["Vor- und Nachname", "Geburtsdatum"], ["Telefon / E-Mail", "Beruf (optional)"], ["Adresse", "Hausärztin / Hausarzt (optional)"]])
    section_heading(doc, "2. Behandlungswunsch")
    field_grid(doc, [["Gewünschte Behandlung / Zone", "Ziel / Erwartung"], ["Frühere Behandlungen in diesem Bereich", "Datum der letzten Behandlung"]])
    checklist(doc, ["Schwangerschaft / Stillzeit", "Herz-Kreislauf-Erkrankung", "Herzschrittmacher / Implantat", "Epilepsie / Krampfanfälle", "Diabetes", "Autoimmunerkrankung", "Blutgerinnungsstörung", "Krebserkrankung", "Akute Infektion / Fieber", "Hauterkrankung / offene Stelle", "Neigung zu Keloiden", "Photosensibilität"], title="3. Medizinische Vorgeschichte")
    field_grid(doc, [[("Details zu angekreuzten Punkten", "")]], cols=1)
    add_continuation_title(doc, "Anamnesebogen Kosmetik", "Seite 2 · Medikamente, Hautstatus und Bestätigung")
    section_heading(doc, "4. Medikamente, Allergien & aktuelle Situation")
    field_grid(doc, [["Regelmäßig eingenommene Medikamente", "Blutverdünner / Antibiotika / Retinoide"], ["Allergien / Unverträglichkeiten", "Operationen / ärztliche Behandlungen"], ["Aktuelle Beschwerden / Schmerzen", "Sonnenbad / Solarium in letzter Zeit"]])
    section_heading(doc, "5. Haut- und Behandlungsstatus")
    checklist(doc, ["Intakte Haut", "Rötung / Reizung", "Entzündung / Akne", "Pigmentveränderung", "Narben", "Tätowierung / Permanent Make-up", "Muttermale / auffällige Läsion", "Vorher-Foto erstellt"], columns=2)
    field_grid(doc, [["Befund / Beobachtung der behandelnden Person", "Empfehlung / ggf. ärztliche Abklärung"]])
    section_heading(doc, "6. Bestätigung")
    p = doc.add_paragraph()
    set_run(p.add_run("Ich bestätige, die Fragen vollständig und wahrheitsgemäß beantwortet zu haben. Änderungen meines Gesundheitszustands oder meiner Medikamente teile ich vor weiteren Behandlungen mit."), 9.5, NAVY)
    signatures(doc)
    final_disclaimer(doc)


def build_customer_card(doc):
    section_heading(doc, "1. Kundenstammdaten")
    field_grid(doc, [["Kundennummer", "Erstkontakt am"], ["Vor- und Nachname", "Geburtsdatum"], ["Telefon", "E-Mail"], ["Adresse", "Bevorzugter Kontaktweg"]])
    section_heading(doc, "2. Profil & Behandlungsplanung")
    field_grid(doc, [["Hauttyp / Hautzustand", "Behandlungsziele"], ["Relevante Anamnese / Kontraindikationen", "Allergien / Unverträglichkeiten"], ["Produkte / Wirkstoffe zu Hause", "Empfohlener Behandlungsplan"]])
    checklist(doc, ["Anamnese aktuell", "Datenschutzhinweise ausgehändigt", "Fotoeinwilligung liegt vor", "Aufklärung / Einwilligung liegt vor"], columns=2)
    add_continuation_title(doc, "Kundenkarte & Behandlungshistorie", "Seite 2 · Laufende Dokumentation")
    section_heading(doc, "3. Behandlungshistorie")
    log_table(doc, ["Datum", "Behandlung / Zone", "Gerät / Parameter", "Reaktion / Ergebnis", "Kürzel"], [1100, 2250, 2500, 2700, 1482], empty_rows=8, font_size=8)
    section_heading(doc, "4. Produkte, Empfehlungen & Folgetermine")
    log_table(doc, ["Datum", "Produkt / Empfehlung", "Anwendung / Hinweis", "Folgetermin"], [1200, 2700, 3932, 2200], empty_rows=4)
    final_disclaimer(doc)


def build_photo_consent(doc):
    section_heading(doc, "1. Person & Anlass")
    field_grid(doc, [["Vor- und Nachname", "Geburtsdatum"], ["Behandlung / Körperzone", "Aufnahmedatum"]])
    section_heading(doc, "2. Getrennte Einwilligungen")
    checklist(doc, ["Aufnahme von Fotos vor, während und nach der Behandlung", "Speicherung in meiner internen Kundenakte", "Nutzung für interne Verlaufsbeurteilung und Qualitätssicherung", "Anonymisierte Nutzung für Schulungen / Fachvorträge", "Veröffentlichung auf Website", "Veröffentlichung in sozialen Medien", "Veröffentlichung in Printmaterialien"], columns=1)
    p = doc.add_paragraph()
    set_run(p.add_run("Veröffentlichungen erfolgen nur für die oben ausdrücklich angekreuzten Zwecke. Gesicht, Tattoos oder andere Identifikationsmerkmale werden nur gezeigt, wenn dies separat vereinbart ist."), 9.5, NAVY)
    section_heading(doc, "3. Widerruf")
    p = doc.add_paragraph()
    set_run(p.add_run("Die Einwilligung ist freiwillig und kann mit Wirkung für die Zukunft widerrufen werden. Ein Widerruf berührt die Rechtmäßigkeit der bisherigen Verarbeitung nicht. Bereits gedruckte Materialien oder weiterverbreitete Inhalte können gegebenenfalls nicht vollständig zurückgerufen werden."), 9.5, NAVY)
    field_grid(doc, [["Kontakt für den Widerruf (Studio / E-Mail)", "Besondere Einschränkungen"]])
    signatures(doc, "Ort, Datum / abgebildete Person", "Studio / behandelnde Person")
    final_disclaimer(doc, "Muster ohne Gewähr. Veröffentlichungszwecke, Speicherdauer und Widerrufskontakt konkret ergänzen; keine vorangekreuzten Felder verwenden.")


def build_privacy(doc):
    section_heading(doc, "1. Verantwortliche Stelle")
    field_grid(doc, [["Studio / Unternehmen", "Inhaberin / Inhaber"], ["Anschrift", "Telefon / E-Mail"], ["Datenschutzkontakt (falls abweichend)", "Datenschutzbeauftragte Person (falls erforderlich)"]])
    section_heading(doc, "2. Verarbeitete Daten & Zwecke")
    checklist(doc, ["Stamm- und Kontaktdaten", "Termin- und Vertragsdaten", "Anamnese / Gesundheitsangaben", "Behandlungsdokumentation", "Geräte- und Parameterdaten", "Fotoaufnahmen", "Zahlungs- und Rechnungsdaten", "Kommunikationsverlauf"], columns=2)
    field_grid(doc, [[("Konkrete Zwecke", "Terminverwaltung, Behandlungsvorbereitung und -durchführung, Dokumentation, Abrechnung, Nachsorge, gesetzliche Nachweise")]], cols=1)
    section_heading(doc, "3. Rechtsgrundlagen")
    p = doc.add_paragraph()
    set_run(p.add_run("Je nach Vorgang kommen insbesondere Vertragserfüllung, gesetzliche Pflichten, berechtigte Interessen und — bei Gesundheitsdaten, Fotos oder Werbung — eine ausdrückliche Einwilligung in Betracht. Unzutreffende Grundlagen streichen und die konkrete Verarbeitung prüfen."), 9.5, NAVY)
    add_continuation_title(doc, "Datenschutzhinweise Kundenakte", "Seite 2 · Empfänger, Fristen und Rechte")
    section_heading(doc, "4. Empfänger & Auftragsverarbeiter")
    field_grid(doc, [["Termin-/Kundensoftware", "Cloud / IT-Dienstleister"], ["Steuerberatung / Zahlungsdienst", "Weitere Empfänger"]])
    section_heading(doc, "5. Speicherdauer")
    field_grid(doc, [["Kunden- und Vertragsdaten", "Gesundheits- / Behandlungsdaten"], ["Fotos", "Rechnungs- / Steuerunterlagen"]])
    section_heading(doc, "6. Ihre Rechte")
    checklist(doc, ["Auskunft", "Berichtigung", "Löschung", "Einschränkung", "Datenübertragbarkeit", "Widerspruch", "Widerruf einer Einwilligung", "Beschwerde bei einer Aufsichtsbehörde"], columns=2)
    section_heading(doc, "7. Bestätigung des Erhalts")
    p = doc.add_paragraph()
    set_run(p.add_run("Ich habe die Datenschutzhinweise erhalten. Eine Einwilligung wird — sofern erforderlich — gesondert, freiwillig und zweckbezogen eingeholt."), 9.5, NAVY)
    signatures(doc, "Ort, Datum / Kundin oder Kunde", "Studio / ausgehändigt durch")
    final_disclaimer(doc, "Datenschutz-Muster ohne Gewähr. Verantwortliche, Zwecke, Rechtsgrundlagen, Empfänger, Drittlandtransfers und Fristen müssen individuell geprüft und ergänzt werden.")


def build_nisv_consent(doc):
    section_heading(doc, "1. Behandlung, Anlage & Personen")
    field_grid(doc, [["Kundin / Kunde", "Geburtsdatum"], ["Behandlung / Körperzone", "Termin / Uhrzeit"], ["Anlage / Modell / Seriennummer", "Anwendende Person"], ["Fachkundenachweis / Zertifikat", "Vorherige Anamnese vom"]])
    section_heading(doc, "2. Beratungsinhalte")
    checklist(doc, ["Ziel und realistisches Ergebnis", "Wirkungsweise der Anlage", "Ablauf und voraussichtliche Dauer", "Empfindungen während der Anwendung", "Mögliche Nebenwirkungen und Risiken", "Kontraindikationen / Arztvorbehalte", "Behandlungsalternativen", "Vor- und Nachsorge", "Verhalten bei Beschwerden", "Kosten und Folgetermine"], columns=2)
    field_grid(doc, [[("Individuelle Hinweise / besondere Risiken", "")]], cols=1)
    add_continuation_title(doc, "NiSV Beratung & Einwilligung", "Seite 2 · Risiken, Alternativen und Nachsorge")
    section_heading(doc, "3. Besprochene mögliche Reaktionen und Risiken")
    checklist(doc, ["Vorübergehende Rötung / Wärme", "Schwellung / Schmerz", "Blasen / Verbrennung", "Pigmentverschiebung", "Narben / Strukturveränderung", "Allergische Reaktion", "Unzureichendes Ergebnis", "Weitere behandlungsspezifische Risiken"], columns=2)
    field_grid(doc, [["Weitere konkret besprochene Risiken", "Individuell erhöhte Risiken"]])
    section_heading(doc, "4. Alternativen & Nachsorge")
    field_grid(doc, [["Besprochene Alternativen / Nichtbehandlung", "Empfohlene Nachsorge"], ["Sonnen-/Wärmeschutz / Produkte", "Kontakt bei ungewöhnlichen Beschwerden"]])
    note_box(doc, "Das Beratungsprotokoll und die Einverständniserklärung sind nach § 3 NiSV zehn Jahre aufzubewahren. Die konkrete Behandlung ist zusätzlich separat zu protokollieren.")
    add_continuation_title(doc, "NiSV Beratung & Einwilligung", "Seite 3 · Einverständniserklärung")
    section_heading(doc, "5. Erklärung der Kundin / des Kunden")
    for text in [
        "Ich konnte Fragen stellen und habe verständliche Antworten erhalten.",
        "Ich habe die Angaben zu meinem Gesundheitszustand vollständig und wahrheitsgemäß gemacht.",
        "Ich wurde über Ablauf, Nutzen, Grenzen, Alternativen, Risiken und Nachsorge informiert.",
        "Mir ist bekannt, dass ein bestimmter Behandlungserfolg nicht garantiert werden kann.",
        "Ich willige in die oben bezeichnete Behandlung mit der genannten Anlage ein.",
        "Ich weiß, dass ich meine Einwilligung bis zum Beginn der Behandlung widerrufen kann.",
    ]:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        set_run(p.add_run(f"☐ {text}"), 9.5, NAVY)
    field_grid(doc, [["Noch offene Fragen / Antworten", "Zusätzliche Vereinbarungen"]])
    signatures(doc)
    final_disclaimer(doc, "Muster ohne Gewähr. Für die konkrete Technologie, Körperzone, Parameter und individuelle Risiken fachlich und rechtlich anpassen.")


def build_device_book(doc):
    section_heading(doc, "1. Anlage & Betreiber")
    field_grid(doc, [["Interne Geräte-ID", "Geräteart / Technologie"], ["Hersteller", "Modell / Typ"], ["Seriennummer", "Baujahr"], ["Betreiber / Unternehmen", "Betriebsort / Raum"], ["Verwendungszweck / Anwendungen", "Inbetriebnahme am"]])
    section_heading(doc, "2. Beschaffung & Dokumente")
    checklist(doc, ["Rechnung / Eigentumsnachweis", "Konformitätserklärung / CE-Unterlagen", "Gebrauchsanweisung", "Installationsnachweis", "Einweisungsnachweis", "Wartungsplan", "Risikoinformationen", "Zubehör-/Applikatorliste"], columns=2)
    field_grid(doc, [["Lieferant / Kaufdatum", "Dokumentenablage / Aktenzeichen"]])
    add_continuation_title(doc, "Gerätebuch / NiSV-Anlagendokumentation", "Seite 2 · NiSV-Anzeige, Installation und Fachkunde")
    section_heading(doc, "3. NiSV-Anzeige")
    field_grid(doc, [["Zuständige Behörde", "Anzeige versendet am"], ["Eingangsbestätigung / Aktenzeichen", "Angezeigter Betriebsort"], ["Anlage zur Anzeige eindeutig identifiziert durch", "Fachkundenachweise beigefügt"]])
    section_heading(doc, "4. Installation & Einweisung")
    field_grid(doc, [["Installation durch / Datum", "Funktionsprüfung / Freigabe"], ["Einweisung durch / Datum", "Dokument / Nachweis"]])
    section_heading(doc, "5. Berechtigte Anwenderinnen und Anwender")
    log_table(doc, ["Name", "Fachkunde / Modul", "Zertifikat / gültig bis", "Einweisung am", "Unterschrift"], [2000, 2200, 2200, 1800, 1832], empty_rows=5)
    add_continuation_title(doc, "Gerätebuch / NiSV-Anlagendokumentation", "Seite 3 · Wartungen und Kontrollen")
    section_heading(doc, "6. Wartungen, Inspektionen & Reparaturen")
    log_table(doc, ["Datum", "Art / Umfang", "Befund / Maßnahme", "Firma / Person", "Nächster Termin"], [1200, 2100, 2900, 2100, 1732], empty_rows=7)
    section_heading(doc, "7. Prüfungen / sicherheitsrelevante Kontrollen")
    log_table(doc, ["Datum", "Prüfung", "Ergebnis / Mangel", "Nachweis", "Fälligkeit"], [1200, 2200, 2900, 1800, 1932], empty_rows=5)
    add_continuation_title(doc, "Gerätebuch / NiSV-Anlagendokumentation", "Seite 4 · Störungen, Änderungen und Außerbetriebnahme")
    section_heading(doc, "8. Störungen, Nebenwirkungen & Vorkommnisse")
    log_table(doc, ["Datum", "Ereignis / Fehler", "Betroffene Anwendung", "Maßnahme / Sperrung", "Freigabe"], [1200, 2300, 1900, 2900, 1732], empty_rows=6)
    section_heading(doc, "9. Änderungen & Außerbetriebnahme")
    field_grid(doc, [["Standort-/Betreiberänderung am", "Behörde informiert am"], ["Endgültig außer Betrieb am", "Grund / Verbleib / Entsorgung"]])
    note_box(doc, "Anlagendokumentation nach § 3 NiSV: Unterlagen zur Identifikation, Installation, Einweisung, Kontrollen, Wartung und Störungen geordnet und aktuell halten; nach letzter Nutzung mindestens drei Jahre aufbewahren.")
    final_disclaimer(doc)


def build_laser_ipl(doc):
    section_heading(doc, "1. Termin & Zuordnung")
    field_grid(doc, [["Kundin / Kunde", "Datum / Uhrzeit"], ["Behandlungszone", "Behandlungsnummer"], ["Anlage / Modell / Seriennummer", "Handstück / Filter / Wellenlänge"], ["Anwendende Person", "Beratung / Einwilligung vom"]])
    section_heading(doc, "2. Haut- und Ausgangsbefund")
    checklist(doc, ["Haut intakt", "Fitzpatrick I", "Fitzpatrick II", "Fitzpatrick III", "Fitzpatrick IV", "Fitzpatrick V", "Fitzpatrick VI", "Vorbräunung", "Tätowierung / PMU", "Muttermale abgedeckt", "Testspot erfolgt", "Vorher-Foto erstellt"], columns=3)
    field_grid(doc, [["Ausgangsbefund / Haarfarbe / Ziel", "Kontraindikationen erneut geprüft"]])
    section_heading(doc, "3. Schutzmaßnahmen")
    checklist(doc, ["Schutzbrille Kundin/Kunde", "Schutzbrille Anwender/in", "Warnschild / Raum gesichert", "Haut gereinigt / rasiert", "Kühlung vorbereitet", "Absaugung / Rauchschutz falls nötig"], columns=2)
    add_continuation_title(doc, "Behandlungsprotokoll Laser & IPL", "Seite 2 · Parameter, Verlauf und Nachsorge")
    section_heading(doc, "4. Behandlungsparameter")
    log_table(doc, ["Zone / Abschnitt", "Fluenz / Energie", "Pulsdauer", "Frequenz", "Spot / Kühlung", "Impulse"], [1900, 1700, 1500, 1500, 1900, 1532], empty_rows=4)
    section_heading(doc, "5. Verlauf & Endpunkt")
    checklist(doc, ["Erwartete Rötung", "Perifollikuläres Ödem", "Schmerz unauffällig", "Kühlung angewendet", "Behandlung abgebrochen", "Keine Auffälligkeit"], columns=2)
    field_grid(doc, [["Hautreaktion / Endpunkt", "Besonderheiten / Abbruchgrund"], ["Nachsorge erklärt / Produkt", "Nächster Termin / Anpassung"]])
    signatures(doc, "Kundin/Kunde: Nachsorge erhalten", "Anwendende Person")
    final_disclaimer(doc)


def build_rf_ultrasound(doc):
    section_heading(doc, "1. Termin & Zuordnung")
    field_grid(doc, [["Kundin / Kunde", "Datum / Uhrzeit"], ["Behandlung / Körperzone", "Behandlungsnummer"], ["Anlage / Modell / Seriennummer", "Applikator / Kartusche"], ["Technologie", "Anwendende Person"]])
    checklist(doc, ["Radiofrequenz", "Mikroneedling-RF", "Ultraschall", "HIFU / fokussierter Ultraschall", "Niederfrequenz / EMF", "Kombinationsbehandlung"], columns=2, title="2. Technologie")
    section_heading(doc, "3. Ausgangsbefund & Sicherheit")
    checklist(doc, ["Anamnese aktuell", "Haut intakt", "Implantate ausgeschlossen / geprüft", "Schwangerschaft ausgeschlossen", "Medikamente geprüft", "Beratung / Einwilligung liegt vor", "Vorher-Foto erstellt", "Testbereich / Toleranz geprüft"], columns=2)
    field_grid(doc, [["Ausgangsbefund / Ziel", "Besondere Risiken / Anpassungen"]])
    add_continuation_title(doc, "Behandlungsprotokoll RF & Ultraschall", "Seite 2 · Parameter, Verlauf und Nachsorge")
    section_heading(doc, "4. Parameter & Behandlung")
    log_table(doc, ["Zone / Abschnitt", "Energie / Stufe", "Frequenz / Tiefe", "Dauer / Schüsse", "Temperatur", "Medium / Kühlung"], [1900, 1700, 1800, 1750, 1382, 1500], empty_rows=4)
    section_heading(doc, "5. Verlauf & Ergebnis")
    checklist(doc, ["Wärme toleriert", "Schmerz unauffällig", "Rötung erwartet", "Schwellung", "Taubheit / Missempfindung", "Behandlung abgebrochen"], columns=2)
    field_grid(doc, [["Reaktion unmittelbar nach Behandlung", "Besonderheiten / Abbruchgrund"], ["Nachsorge / Verhalten erklärt", "Folgetermin / Parameterempfehlung"]])
    signatures(doc, "Kundin/Kunde: Nachsorge erhalten", "Anwendende Person")
    final_disclaimer(doc)


def build_hygiene(doc):
    section_heading(doc, "1. Betrieb & Verantwortung")
    field_grid(doc, [["Studio / Standort", "Hygieneverantwortliche Person"], ["Gültig ab", "Überprüfung / nächste Aktualisierung"]])
    section_heading(doc, "2. Standard-Reinigungsplan")
    log_table(doc, ["Bereich / Gegenstand", "Mittel / Konzentration", "Einwirkzeit", "Häufigkeit / Anlass", "Verantwortlich"], [2350, 2500, 1500, 2200, 1482], empty_rows=8, font_size=8)
    checklist(doc, ["Herstellerangaben beachtet", "Flächendesinfektion gelistet", "Händehygiene geregelt", "Wäschekreislauf geregelt", "Abfallentsorgung geregelt", "Aufbereitung von Zubehör geregelt"], columns=2)
    add_continuation_title(doc, "Hygiene- & Reinigungsplan", "Seite 2 · Durchführungsnachweis und Ereignisse")
    section_heading(doc, "3. Durchführungsnachweis")
    log_table(doc, ["Datum / Uhrzeit", "Bereich / Tätigkeit", "Mittel", "Besonderheit", "Kürzel"], [1700, 2800, 1900, 2400, 1232], empty_rows=8)
    section_heading(doc, "4. Abweichungen, Kontaminationen & Maßnahmen")
    log_table(doc, ["Datum", "Ereignis / Abweichung", "Sofortmaßnahme", "Freigabe / Kontrolle"], [1400, 3200, 2900, 2532], empty_rows=4)
    final_disclaimer(doc, "Muster ohne Gewähr. Mittel, Konzentrationen, Einwirkzeiten und Aufbereitung immer nach Herstellerangaben und lokalem Hygieneplan festlegen.")


def build_maintenance_fault(doc):
    section_heading(doc, "1. Gerät & Anlass")
    field_grid(doc, [["Interne Geräte-ID", "Hersteller / Modell"], ["Seriennummer", "Betriebsort"], ["Datum / Uhrzeit", "Meldende Person"]])
    checklist(doc, ["Planmäßige Wartung", "Inspektion", "Sicherheitsprüfung", "Kalibrierung", "Reparatur", "Störung / Ausfall", "Softwareupdate", "Sonstiges"], columns=2, title="2. Vorgang")
    field_grid(doc, [["Auftrag / Fehlerbeschreibung", "Fehlercode / beobachtetes Verhalten"], ["Gerät sofort gesperrt", "Ausfallzeit / betroffene Termine"]])
    section_heading(doc, "3. Befund & Maßnahme")
    field_grid(doc, [["Technischer Befund", "Durchgeführte Arbeiten"], ["Ersatzteile / Material", "Messwerte / Prüfergebnis"]])
    add_continuation_title(doc, "Wartungs-, Prüf- & Störungsprotokoll", "Seite 2 · Freigabe und Verlauf")
    section_heading(doc, "4. Abschluss & Freigabe")
    checklist(doc, ["Funktionsprüfung bestanden", "Sicherheitsprüfung bestanden", "Gerät freigegeben", "Gerät bleibt gesperrt", "Nacharbeit erforderlich", "Behörde / Hersteller informiert"], columns=2)
    field_grid(doc, [["Ergebnis / Restmangel", "Nächste Wartung / Prüfung"], ["Servicefirma / Techniker", "Berichts-/Auftragsnummer"]])
    signatures(doc, "Ort, Datum / Techniker oder Prüfer", "Betreiber / Freigabe")
    section_heading(doc, "5. Fortlaufende Ereignisübersicht")
    log_table(doc, ["Datum", "Vorgang", "Befund / Maßnahme", "Freigabe", "Nachweis"], [1200, 1800, 3400, 1800, 1832], empty_rows=5)
    final_disclaimer(doc)


def build_stk_protocol(doc):
    section_heading(doc, "1. Prüfauftrag, Produkt & Betreiber")
    field_grid(doc, [["Prüfauftrag / Auftragsnummer", "Prüfdatum / Uhrzeit"], ["Betreiber / Unternehmen", "Betriebsort / Raum"], ["Produkt / Handelsname", "Hersteller / Modell / Typ"], ["Seriennummer / UDI-DI", "Interne Geräte-ID / Medizinproduktebuch"], ["Inbetriebnahme", "Letzte STK / nächste Fälligkeit"]])
    section_heading(doc, "2. Prüfgrundlage & Prüfer")
    checklist(doc, ["Produkt der Anlage 1 MPBetreibV", "Sonstige STK-Pflicht geprüft", "Herstellerangaben berücksichtigt", "Anerkannte Regeln der Technik berücksichtigt", "Betriebs- und Umgebungsbedingungen berücksichtigt", "Zubehör / Kombinationen einbezogen"], columns=2)
    field_grid(doc, [["Prüfverfahren / Norm / Regelwerk", "Herstellerunterlagen / Version"], ["Prüffirma / prüfende Person", "Qualifikation nach § 5 MPBetreibV"]])
    note_box(doc, "Rechtsgrundlage: § 12 MPBetreibV. Ob und in welchem Umfang eine STK erforderlich ist, muss für das konkrete Produkt, seine Einstufung, Herstellerangaben und Betriebsbedingungen geprüft werden.", caution=True)

    add_continuation_title(doc, "STK-Prüfprotokoll nach MPBetreibV", "Seite 2 · Sicht-, Funktions- und Messprüfung")
    section_heading(doc, "3. Sichtprüfung")
    checklist(doc, ["Gehäuse und mechanische Teile unbeschädigt", "Netzleitung / Stecker / Zugentlastung intakt", "Anschlüsse, Leitungen und Applikatoren intakt", "Kennzeichnungen und Warnhinweise lesbar", "Sicherungen / Abdeckungen ordnungsgemäß", "Zubehör vollständig und geeignet", "Gebrauchsanweisung verfügbar", "Hygienischer Zustand unauffällig", "Keine unzulässigen Änderungen erkennbar", "Aufstellung / Umgebungsbedingungen geeignet"], columns=2)
    section_heading(doc, "4. Funktions- und Sicherheitsprüfung")
    checklist(doc, ["Einschalt- / Selbsttest bestanden", "Bedien- und Anzeigeelemente funktionieren", "Sicherheits- / Abschalteinrichtungen wirksam", "Alarme und Signale funktionieren", "Anwendungs- / Ausgangsfunktion plausibel", "Zubehör und Kombinationen funktionieren", "Softwarestand / Konfiguration geprüft", "Funktionsprüfung unter Betriebsbedingungen"], columns=2)
    section_heading(doc, "5. Messwerte & Prüfverfahren")
    log_table(doc, ["Prüfschritt / Messgröße", "Messverfahren / Norm", "Soll- / Grenzwert", "Ist- / Messwert", "Ergebnis"], [2400, 2200, 1900, 1900, 1632], empty_rows=5, font_size=8)

    add_continuation_title(doc, "STK-Prüfprotokoll nach MPBetreibV", "Seite 3 · Befund, Bewertung und Freigabe")
    section_heading(doc, "6. Verwendete Prüf- und Messmittel")
    log_table(doc, ["Messmittel / ID", "Hersteller / Typ", "Kalibrierung gültig bis", "Einsatz / Bemerkung"], [2200, 2600, 2400, 2832], empty_rows=3, font_size=8)
    section_heading(doc, "7. Mängel, Maßnahmen & Nachprüfung")
    log_table(doc, ["Befund / Abweichung", "Bewertung", "Maßnahme / Frist", "Nachprüfung / Ergebnis"], [3100, 1900, 2800, 2232], empty_rows=3, font_size=8)
    section_heading(doc, "8. Gesamtergebnis")
    checklist(doc, ["STK erfolgreich / bestanden", "Bestanden mit dokumentierter Auflage", "Nicht bestanden – Produkt gesperrt", "Nachprüfung erforderlich"], columns=2)
    field_grid(doc, [["Zusammenfassende Bewertung / Restmangel", "Freigabe / Nutzungseinschränkung"], ["Nächste STK: Monat / Jahr", "Prüfplakette / Kennzeichen der prüfenden Person"], ["Protokoll an Betreiber übergeben", "Medizinproduktebuch aktualisiert am"]])
    signatures(doc, "Ort, Datum / prüfende Person", "Betreiber / Protokoll erhalten")
    final_disclaimer(doc, "Muster ohne Gewähr. Durchführung und Bewertung ausschließlich durch nach § 5 MPBetreibV qualifizierte Personen. Dieses Formular ersetzt weder Hersteller-Prüfanweisungen noch die produktspezifische Festlegung von Prüfumfang und Grenzwerten.")


DOCUMENTS = [
    ("Anamnesebogen Kosmetik", "Gesundheitsangaben und Behandlungsrelevantes strukturiert erfassen.", "anamnesebogen-kosmetik", build_anamnesis),
    ("Kundenkarte & Behandlungshistorie", "Stammdaten, Behandlungsplan und Verlauf in einer übersichtlichen Kundenakte.", "kundenkarte-behandlungshistorie", build_customer_card),
    ("Einwilligung Fotodokumentation", "Interne Dokumentation und Veröffentlichung getrennt und freiwillig freigeben.", "fotodokumentation-einwilligung", build_photo_consent),
    ("Datenschutzhinweise Kundenakte", "Ausfüllbares Muster für die transparente Information Ihrer Kundschaft.", "datenschutzhinweise-kundenakte", build_privacy),
    ("NiSV Beratung & Einwilligung", "Beratungsprotokoll und Einverständniserklärung für NiSV-relevante Anwendungen.", "nisv-beratung-einwilligung", build_nisv_consent),
    ("Gerätebuch / NiSV-Anlagendokumentation", "Stammdaten, Anzeige, Fachkunde, Wartung, Störungen und Außerbetriebnahme.", "geraetebuch-nisv", build_device_book),
    ("Behandlungsprotokoll Laser & IPL", "Parameter, Schutzmaßnahmen, Hautreaktion und Nachsorge nachvollziehbar dokumentieren.", "behandlungsprotokoll-laser-ipl", build_laser_ipl),
    ("Behandlungsprotokoll RF & Ultraschall", "Parameter, Temperatur, Verlauf und Nachsorge für RF- und Ultraschallanwendungen.", "behandlungsprotokoll-rf-ultraschall", build_rf_ultrasound),
    ("Hygiene- & Reinigungsplan", "Reinigung, Desinfektion, Verantwortung und Durchführung im Studio planen.", "hygiene-reinigungsplan", build_hygiene),
    ("Wartungs-, Prüf- & Störungsprotokoll", "Technische Ereignisse, Maßnahmen, Prüfergebnis und Freigabe dokumentieren.", "wartung-pruefung-stoerung", build_maintenance_fault),
    ("STK-Prüfprotokoll nach MPBetreibV", "Sicherheitstechnische Kontrolle mit Prüfgrundlage, Messwerten, Mängeln und Freigabe dokumentieren.", "stk-pruefprotokoll-medizinprodukte", build_stk_protocol),
]


if __name__ == "__main__":
    for document in DOCUMENTS:
        path = make_document(*document)
        print(path)
