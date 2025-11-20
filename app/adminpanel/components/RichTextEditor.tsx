'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect, useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Digite o conteúdo do blogpost aqui...',
}: RichTextEditorProps) {
  const [showHtmlView, setShowHtmlView] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkText, setLinkText] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#086972] underline hover:text-[#0b95a2]',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  const handleSetLink = () => {
    if (linkUrl) {
      const { from, to } = editor!.state.selection
      const selectedText = editor!.state.doc.textBetween(from, to)

      if (selectedText) {
        // Se há texto selecionado, adiciona link ao texto selecionado
        editor!.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      } else {
        // Se não há texto selecionado, insere o link com o texto fornecido
        const textToInsert = linkText || linkUrl
        editor!.chain().focus().insertContent(`<a href="${linkUrl}">${textToInsert}</a>`).run()
      }
      setLinkUrl('')
      setLinkText('')
      setShowLinkDialog(false)
    }
  }

  const handleRemoveLink = () => {
    editor!.chain().focus().unsetLink().run()
    setShowLinkDialog(false)
  }

  const handleOpenLinkDialog = () => {
    const { from, to } = editor!.state.selection
    const selectedText = editor!.state.doc.textBetween(from, to)
    const linkAttributes = editor!.getAttributes('link')

    if (linkAttributes.href) {
      setLinkUrl(linkAttributes.href)
      setLinkText(selectedText)
    } else {
      setLinkUrl('')
      setLinkText(selectedText)
    }
    setShowLinkDialog(true)
  }

  if (!editor) {
    return null
  }

  const currentHtml = editor.getHTML()

  return (
    <div className="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#086972]">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-gray-50 rounded-t-lg">
        {/* Formatação de Texto */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('bold')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Negrito"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('italic')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Itálico"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('strike')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Tachado"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('code')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Código inline"
        >
          {'</>'}
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Título 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Título 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Título 3"
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Listas */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Lista com marcadores"
        >
          • Lista
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alinhamento */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive({ textAlign: 'left' })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Alinhar à esquerda"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive({ textAlign: 'center' })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Centralizar"
        >
          ⬌
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive({ textAlign: 'right' })
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Alinhar à direita"
        >
          ➡
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={handleOpenLinkDialog}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('link')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Adicionar/Editar Link"
        >
          🔗 Link
        </button>
        {editor.isActive('link') && (
          <button
            type="button"
            onClick={handleRemoveLink}
            className="px-3 py-1.5 rounded text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            title="Remover Link"
          >
            🔗✕
          </button>
        )}
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Outros */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Citação"
        >
          &quot;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          title="Linha horizontal"
        >
          ─
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Desfazer/Refazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Desfazer"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refazer"
        >
          ↷
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Visualizar HTML */}
        <button
          type="button"
          onClick={() => setShowHtmlView(!showHtmlView)}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            showHtmlView
              ? 'bg-[#086972] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          title="Visualizar HTML"
        >
          {'</>'} HTML
        </button>
      </div>

      {/* Dialog de Link */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#053d42]">
              {editor.isActive('link') ? 'Editar Link' : 'Adicionar Link'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Link
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://exemplo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
                  autoFocus
                />
              </div>
              {!editor.state.selection.empty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto do Link (opcional)
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Texto do link"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972]"
                  />
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkDialog(false)
                    setLinkUrl('')
                    setLinkText('')
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                {editor.isActive('link') && (
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remover
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSetLink}
                  className="px-4 py-2 bg-[#086972] text-white rounded-lg hover:bg-[#0b95a2] transition-colors"
                >
                  {editor.isActive('link') ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor Content ou HTML View */}
      {showHtmlView ? (
        <div className="rounded-b-lg overflow-y-auto max-h-[600px] bg-gray-50 p-4">
          <textarea
            value={currentHtml}
            onChange={(e) => {
              editor.commands.setContent(e.target.value, { emitUpdate: false })
              onChange(e.target.value)
            }}
            className="w-full h-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086972] font-mono text-sm"
            placeholder="HTML do conteúdo..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Você pode editar o HTML diretamente aqui. As alterações serão refletidas no editor visual.
          </p>
        </div>
      ) : (
        <div className="rounded-b-lg overflow-y-auto max-h-[600px]">
          <EditorContent editor={editor} />
        </div>
      )}

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 400px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.67em;
          margin-bottom: 0.67em;
        }
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.83em;
          margin-bottom: 0.83em;
        }
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin-top: 1em;
          margin-bottom: 1em;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #086972;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
        }
        .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5em 0;
        }
        .ProseMirror a {
          color: #086972;
          text-decoration: underline;
          cursor: pointer;
        }
        .ProseMirror a:hover {
          color: #0b95a2;
        }
        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #053d42;
          font-family: monospace;
        }
        .ProseMirror[style*='text-align: center'] {
          text-align: center;
        }
        .ProseMirror[style*='text-align: right'] {
          text-align: right;
        }
        .ProseMirror[style*='text-align: left'] {
          text-align: left;
        }
      `}</style>
    </div>
  )
}
