// src/components/blog/Table.tsx
import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextMarkComponentProps } from '@portabletext/react';

type SanityLink = {
  _type: 'link';
  href: string;
};

const cellComponents = {
  marks: {
    link: (props: PortableTextMarkComponentProps<SanityLink>) => {
      const { children, value } = props;
      const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value?.href || '#'} rel={rel} className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },
  },
};

interface TableProps {
  value: {
    rows: {
      _key: string;
      cells: { content: any[] }[]; // Each cell is now an OBJECT with a 'content' property
    }[];
  };
}

const Table: React.FC<TableProps> = ({ value }) => {
  const { rows } = value;
  if (!rows || rows.length === 0) {
    return null;
  }

  const [header, ...bodyRows] = rows;

  return (
    <div className="overflow-x-auto my-8 border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {header.cells.map((cell, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider align-top"
              >
                {/* FIX: Access the 'content' property of the cell */}
                <PortableText value={cell.content} components={cellComponents} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {bodyRows.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell, index) => (
                <td
                  key={index}
                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 align-top min-w-[150px] break-words"
                >
                  {/* FIX: Access the 'content' property of the cell */}
                  <PortableText value={cell.content} components={cellComponents} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 